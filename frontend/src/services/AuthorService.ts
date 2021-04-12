export class AuthorService {
  constructor(private baseUrl: string) {}

  get(id: number): Promise<AuthorInfo> {
    // return fetch(this.baseUrl + "/author/" + id);
    return fetch("/scenemodels/author/author.json")
            .then(d => d.json());
  }

  
  getAll(start = 0, length = 20): Promise<AuthorInfo[]> {
    let url = this.baseUrl + "/authors/list/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    // return fetch(url);
    return fetch('/scenemodels/authors/list/20.json')
            .then(d => d.json());
  }
}

export interface Author {
  author: string;
  author_id: number;
  count: number;
}

export interface AuthorInfo {
  id: number;
  name: string;
  notes: string;
  models: string;
}