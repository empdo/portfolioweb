export interface topic {
  topic: {
    name: string;
    id: string;
  }
}

export interface repository {
    name: string;
    stargazerCount: number;
    url: string;
    description: string;
    repositoryTopics: {
      nodes: topic[]
    }
}
