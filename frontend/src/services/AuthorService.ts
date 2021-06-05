export class AuthorService {
  constructor(private baseUrl: string) {
    console.log("AuthorService", baseUrl);
  }

  get(id: number | string): Promise<AuthorInfo> {
    return (
      fetch(`${this.baseUrl}/author/${id}`) // /author/:id
        .then((d) => d.json())
    );
  }

  getAll(start = 0, length = 20): Promise<AuthorInfo[]> {
    let url = this.baseUrl + "/authors/list/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    // /authors/list/:limit/:offset?
    return (
      fetch(url)
        .then((d) => d.json())
    );
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
