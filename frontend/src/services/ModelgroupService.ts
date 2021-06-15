import { jsonResponseOrError } from "./ServiceUtil";

export class ModelgroupService {
  constructor(private baseUrl: string) {}

  public getAll(): Promise<ModelGroup[]> {
    return fetch(`${this.baseUrl}/modelgroups/`)
      .then(jsonResponseOrError)
      .then((data) => {
        return data.sort((a, b) => a.id <= b.id);
      });
  }

  public getById(id: number): Promise<ModelGroup> {
    return fetch(`${this.baseUrl}/modelgroups/$id`).then(jsonResponseOrError);
  }
}

export interface ModelGroup {
  id: number;
  name: string;
  path: string;
}
