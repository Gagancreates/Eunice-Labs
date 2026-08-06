# SWE-RL: Teaching LLMs to Fix Real Software with RL

![SWE-RL paper, first page](/blog-images/swe-rl-paper.png)

*A note on where this came from: I recently gave a talk walking through this paper, and the walkthrough came together well enough that I decided to put it out as a post. What follows is that talk in written form.*

In February 2025, Meta released [SWE-RL](https://arxiv.org/abs/2502.18449) — the first paper to make reinforcement learning work on *real* software engineering, using an embarrassingly simple reward. The recipe it proved out is now, in some form, how every frontier coding model is trained. This post walks through the whole thing: where the paper came from, how GRPO actually works (with one running example carried through every formula), and what happened in the eighteen months after.

## The world before this paper

**2023 — the benchmark.** SWE-bench (Jimenez et al., Princeton) changed how coding models are measured. Instead of toy puzzles, it scrapes real GitHub issues from 12 real Python repos — django, sympy, scikit-learn. The task: here's the issue text, here's the codebase, write a patch. The repo's own test suite decides whether you succeeded. At launch, the best models solved about **2%**. In 2024, OpenAI released the human-verified 500-task subset — *SWE-bench Verified* — which became the number everyone quotes.

**2024 — progress without training.** Scores climbed, but the models themselves never got better at fixing bugs — people got better at *using* them. Two flavors of this:

- **SWE-agent** wrapped a frozen LLM in an agent loop with tools (search, view, edit).
- **Agentless** pushed back on agents entirely: a hardcoded pipeline of *localize → repair → validate*, calling the model only for narrow subtasks. This simpler approach beat the agent — **23.2%** with GPT-4o.

Meanwhile, the open models that tried to catch up (SWE-Gym, SWE-Fixer, Lingma-SWE-GPT) did it by **distilling** GPT-4o or Claude outputs — fine-tuning on a bigger model's successful solutions. That *is* training, but it's imitation: the ceiling is the teacher.

**Meanwhile, RL was working — elsewhere.** DeepSeek-R1 had just shown that RL massively scales reasoning. But only for math and competitive programming: one correct answer, cheap unambiguous reward. Real software issues are the opposite — multi-file, ambiguous, many valid fixes for the same bug. Nobody had scaled RL to that messiness. That's the gap SWE-RL fills.

## The setup

Every training example in the seed dataset $\mathcal{D}_{seed}$ has three parts, mined from millions of GitHub PRs:

- **issue** — the bug report.
- **ctx** — code context: the files to repair, plus relevant files that *shouldn't* be edited (so the model learns to leave things alone).
- **patch$_{gt}$** — the *oracle patch*: the fix a human actually merged for this issue.

A fixed template glues the first two into a prompt:

$$q = \text{form-prompt}(\text{issue},\ \text{ctx})$$

Now the first interesting move: the policy LLM $\pi_\theta$ doesn't generate one patch. It samples a whole **group** of $G$ candidate patches $o_1, \dots, o_G$ for the same prompt. That group is literally the "G" in GRPO — everything that follows works by comparing these siblings to each other.

## The reward: similarity, not execution

How do you score a patch without running anything? Two steps.

**Step 1 — format check.** The model must output edits in a strict search/replace format. If it can't be parsed: reward is **−1**, conversation over.

**Step 2 — text similarity.** If it parses, compare the model's patch against the oracle patch with Python's `difflib.SequenceMatcher` — literally "how much of these two texts lines up" — giving a continuous score in $[0, 1]$:

$$r_i=\begin{cases}-1 & \text{if the edit format can't be parsed}\\ \text{sim}(o_i,\ \text{patch}_{gt})\in[0,1] & \text{otherwise}\end{cases}$$

Here's the subtlety. Suppose the oracle fix for a cache-expiry bug is:

```diff
  def get(self, key):
-     if key in cache:
+     if key in cache and not expired(key):
          return cache[key]
```

And the model writes the *same fix* with the clauses swapped:

```diff
  def get(self, key):
-     if key in cache:
+     if not expired(key) and key in cache:
          return cache[key]
```

Same logic, different wording — `SequenceMatcher` ratio: **0.87**, not 1.0. Pure text comparison, no code is ever run. Cheap and scalable, with a blind spot we'll come back to.

## The running example: one issue, four patches

Say $G = 4$ (the paper uses 16). Four sampled attempts at that cache-expiry issue, each scored against the oracle:

- $o_1$ — the right fix, clauses swapped → $r_1 = 0.87$
- $o_2$ — edits the miss-branch instead of the hit-check → $r_2 = 0.32$
- $o_3$ — malformed edit block, can't be parsed → $r_3 = -1$
- $o_4$ — nearly identical to the oracle → $r_4 = 0.95$

Is 0.32 good or bad? You can't tell from the number alone. GRPO's whole answer: *don't judge it alone — judge it against its siblings.* These four numbers ride along through every formula below.

## GRPO, piece by piece

**The core idea.** Classic PPO needs two networks: the policy, and a critic that estimates "how good is this state" as a baseline. For LLMs that's a second giant model to train. GRPO deletes it: sample $G$ outputs for the same prompt, score them, and use *the group average* as the baseline. The group replaces the critic.

### The advantage

The heart of GRPO is just a z-score:

$$A_i=\dfrac{r_i-\mathrm{mean}(r_1,\dots,r_G)}{\mathrm{std}(r_1,\dots,r_G)}$$

Plug our four rewards in — mean $= 0.285$, std $\approx 0.78$:

- $o_1$: $A_1 = +0.75$ → reinforce
- $o_2$: $A_2 = +0.04$ → barely touch it
- $o_3$: $A_3 = -1.65$ → push down, hard
- $o_4$: $A_4 = +0.85$ → reinforce the most

Note $o_2$: a mediocre patch in a mediocre group sits at the average, so the update leaves it almost untouched. No critic ever estimated anything — the group itself is the baseline.

### The full objective

$$\mathcal{J}(\theta)=\mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G}\left(\min\!\big(r_i(\theta)A_i,\ \mathrm{clip}(r_i(\theta),1-\epsilon,1+\epsilon)A_i\big)-\beta D_{KL}(\pi_\theta\,\|\,\pi_{ref})\right)\right]$$

Looks terrifying; it has exactly four moving parts, and you already own the most important one — $A_i$ is the advantage we just computed. The rest:

**The policy ratio.** Same transformer, two snapshots in time:

$$r_i(\theta)=\dfrac{\pi_\theta(o_i\mid q)}{\pi_{\theta_{old}}(o_i\mid q)}$$

"Since the last update, did I become more or less likely to produce this exact patch?" And what does "probability of a patch" mean? At each step the model's softmax assigns a probability to the token actually picked (0.9, 0.7, 0.8, ...). The sequence probability is their product — done as a sum of logs to avoid underflow:

$$\log \pi_\theta(o_i\mid q)=\sum_{t=1}^{T}\log \pi_\theta\big(o_i^{(t)}\mid q,\,o_i^{(\lt t)}\big)$$

Crucially, this is **cached at generation time** — that's the denominator of the ratio, computed once and stored.

**Clip + min — the trust region.** Cap the ratio to $[1-\epsilon,\ 1+\epsilon]$ (typically $\epsilon = 0.2$), take the min of clipped and unclipped. Plainly: even if a patch looks great, don't yank the weights toward it in one giant step. One subtlety: for a *bad* patch the min doesn't protect it — the model can keep being pushed away from bad outputs without limit. The cap is on enthusiasm, not on punishment.

**The KL penalty — the seatbelt.** $-\beta D_{KL}(\pi_\theta \| \pi_{ref})$ penalizes drifting too far from a frozen reference model (the pre-RL checkpoint). Without it, pure reward-chasing finds degenerate tricks — game the similarity metric, forget how to write English.

## The training loop

The motto: **generate once, update, repeat.**

**Step 1 — rollout.** The only place generation happens. Freeze weights $\theta_{old}$, sample $G$ completions token by token, cache each token's log-prob as you go, then score everything and compute advantages per group.

**Steps 2–3 — re-score, don't regenerate.** To get the ratio you don't generate anything new. Feed the fixed sequence ($q$ + $o_i$) through the model in one causal-masked forward pass and read off what probability the *current* weights assign to tokens that are already there. That's teacher forcing — mechanically identical to computing a normal training loss. On the first pass, weights haven't moved, so every ratio is exactly 1. Then the update:

$$\mathcal{L}(\theta)=-\,\mathcal{J}(\theta)\qquad\Longrightarrow\qquad \theta_{new}=\theta_{old}-\eta\,\nabla_{\theta}\mathcal{L}=\theta_{old}+\eta\,\nabla_{\theta}\mathcal{J}$$

The loss is just the negated objective (optimizers minimize; we want $\mathcal{J}$ maximized), and one step of size $\eta$ nudges every weight in the direction that makes high-advantage patches more likely.

**Finishing the running example with $o_4$** ($A_4 = 0.85$, $\epsilon = 0.2$, $\beta = 0.1$): unclipped term $1 \times 0.85 = 0.85$; clipped term $\mathrm{clip}(1, 0.8, 1.2) \times 0.85 = 0.85$; min $= 0.85$; minus the KL term ($0.1 \times 0.05$) → $0.845$. Do the same for $o_1$–$o_3$ ($o_3$'s term is negative — it gets pushed down), average the four → $\mathcal{J}$. Negate, backprop, weights shift toward $o_4$ and away from $o_3$. Re-score the same tokens and the ratio drifts to about 1.11. Once ratios go stale, resample — the updated weights become the new $\theta_{old}$.

**Why this matters for code repair.** The model is *only* trained to write a patch given file context — but to patch well it implicitly has to figure out *where* the bug is. Diagnosis gets learned as a side effect of repair. At eval time (SWE-bench via Agentless Mini), the model also has to do fault localization and test selection — subtasks it was never trained on — and it generalizes to them anyway.

## Configs and results

- **Base model:** Llama-3.3-70B-Instruct (doubles as $\pi_{ref}$ and initial $\theta_{old}$), 16k context, 1,600 rollout→update cycles.
- **Batch:** 512 = 32 problems × 16 rollouts — so $G = 16$, exactly our toy example scaled up.
- **One Adam step per batch.** Unlike textbook PPO's multiple updates per rollout, SWE-RL takes a single step and immediately resamples. Ratios barely leave 1 — maximally stable, but you pay full generation cost every step.
- **Hardware:** 512 H100s for ~32 hours ≈ 16,400 GPU-hours, ~820,000 sampled patches. Almost all of it spent generating, not updating.

The control group is SFT on the same data: train directly on (issue, ctx) → patch$_{gt}$ with cross-entropy — copy the textbook answer. The result: **RL wins, 41.0% on SWE-bench Verified** — at the time the best reported for models under 100B, comparable to GPT-4o, from an open 70B. SFT overfits to the *surface form* of patches; RL optimizes for outcome, and outcome-optimization generalizes.

## Honest limitations

1. **The reward never runs the code.** Similarity is a proxy — a correct fix worded differently scores 0.87, and a broken lookalike can score high.
2. **One shot, no interaction.** The model can't execute, test, or iterate on its own patch.
3. **Small window, borrowed pipeline.** 16k context, and it leans on an Agentless-style pipeline to find the right files.
4. **Python only.** Transfer to other languages and huge codebases was untested.

Keep these four in mind — the next section is the story of each one getting fixed.

## What came next (Feb 2025 → today)

**1. Run the code, don't compare text.** Successors put each candidate patch in a sandboxed copy of the repo and run the actual test suite. Reward = tests pass, nothing else. Any correct fix scores full marks regardless of wording; no broken lookalike sneaks by. More expensive — you need container infra for every rollout — but the reward becomes unfoolable.

**2. Let the model act — agentic RL.** Instead of one patch from frozen context, the model became an agent: open files, reproduce the bug, edit, run tests, read failures, try again — and RL rewards the *entire episode* at the end. The beautiful part: it's the same GRPO math. The only change is that "one output $o_i$" is now a whole multi-step, tool-using trajectory instead of a single patch.

**3. Then scale everything.** Thousands of real repos containerized into training gyms; 128k+ contexts; many rollouts per issue at test time (keep the one that passes); every language, not just Python. The idea stayed SWE-RL's — sample attempts, reward outcomes, compare within the group — while each of its four limitations got engineered away.

The result: SWE-bench Verified got crushed — past 90% within eighteen months — which raised contamination concerns and pushed the field to the harder, contamination-resistant **SWE-bench Pro**. As of August 2026, frontier models (Claude Opus 5, GPT-5.6 Sol, Claude Fable 5, Kimi K3) sit at 93–97% on Verified but roughly 60–80% on Pro. Real-world software engineering still has headroom.

## Five takeaways

1. **First real-world SWE + RL at scale** — no proprietary distillation, just open issue/PR data and a rule-based reward.
2. **No critic needed** — group-relative advantage replaces the value network.
3. **Clip + KL keep it stable** — trust region and reference-policy anchoring prevent collapse.
4. **Repair teaches diagnosis** — bug localization emerges as a side effect of learning to patch.
5. **It set the direction** — reward outcomes, don't imitate. That bet went from contrarian to industry default in about a year.
