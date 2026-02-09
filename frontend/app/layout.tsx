import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eunice Labs",
  description: "Exploring the frontiers of synthetic intelligence through curiosity-driven experimentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
          integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8"
          crossOrigin="anonymous"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
          integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${ebGaramond.variable} ${inter.variable} antialiased`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                if (window.renderMathInElement) {
                  renderMathInElement(document.body, {
                    delimiters: [
                      {left: "\\\\[", right: "\\\\]", display: true},
                      {left: "\\\\(", right: "\\\\)", display: false}
                    ],
                    throwOnError: false
                  });
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
