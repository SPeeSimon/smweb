import { jsonResponseOrError, urlWithOptionalLimitOffset } from "./ServiceUtil";

export class AuthorService {
  constructor(private baseUrl: string) {
    //
  }

  get(id: number | string): Promise<AuthorInfo> {
    return fetch(`${this.baseUrl}/author/${id}`) // /author/:id
      .then(jsonResponseOrError);
  }

  getAll(start = 0, length = 20): Promise<AuthorInfo[]> {
    const url = urlWithOptionalLimitOffset(`${this.baseUrl}/author/list/`, length, start); // /authors/list/:limit/:offset?
    return fetch(url).then(jsonResponseOrError);
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
  notes?: string;
  models: string;
}
