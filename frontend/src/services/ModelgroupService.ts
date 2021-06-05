export class ModelgroupService {
  constructor(private baseUrl: string) {}

  public getAll(): Promise<ModelGroup[]> {
    const url = `${this.baseUrl}/modelgroups/`;
    return fetch(url).then(d => d.json());
  }

  public getById(id: number): Promise<ModelGroup> {
    return fetch(`${this.baseUrl}/modelgroups/$id`).then(d => d.json());
  }
}


export interface ModelGroup {
  id: number;
  name: string;
  path: string;
}
