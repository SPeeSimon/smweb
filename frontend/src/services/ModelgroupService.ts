export class ModelgroupService {
  constructor(private baseUrl: string) {}

  public getAll(): Promise<ModelGroup[]> {
    const url = `${this.baseUrl}/modelgroups/`;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    }).then(data => {
      return data.sort((a,b) => a.id <= b.id)
    });
  }

  public getById(id: number): Promise<ModelGroup> {
    return fetch(`${this.baseUrl}/modelgroups/$id`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }
}

export interface ModelGroup {
  id: number;
  name: string;
  path: string;
}
