export interface Experiment {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  url: string;
}
