export class ObjectService {
  constructor(private baseUrl: string) {}

  public getAll(start = 0, length = 20): Promise<any> {
    let url = this.baseUrl + "/objects/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    console.log("fetching", url);
    return fetch("scenemodels/objects/objects.json").then((d) => d.json());
  }

  public getById(id: string | number): Promise<any> {
    const url = this.baseUrl + "/object/" + id;
    console.log("fetching", url);
    return fetch("scenemodels/objects/object.json").then((d) => d.json());
  }
}
