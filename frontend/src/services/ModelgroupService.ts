export class ModelgroupService {
  constructor(private baseUrl: string) {}

  public getAll(): Promise<ModelGroup[]> {
    const url = "scenemodels/modelgroups/index.json";
    // const url = this.baseUrl + "/modelgroups/";
    return fetch(url).then(d => d.json());
  }
}


export interface ModelGroup {
  id: number;
  name: string;
  path: string;
}