export class AuthorService {
  constructor(private baseUrl: string) {
    console.log("AuthorService", baseUrl);
  }

  get(id: number | string): Promise<AuthorInfo> {
    return fetch(`${this.baseUrl}/author/${id}`) // /author/:id
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      });
  }

  getAll(start = 0, length = 20): Promise<AuthorInfo[]> {
    let url = this.baseUrl + "/author/list/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    // /authors/list/:limit/:offset?
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
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
