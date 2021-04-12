export class ObjectService {
  constructor(private baseUrl: string) {}

  public getAll(start = 0, length = 20): Promise<any> {
    let url = this.baseUrl + "/objects/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    // return fetch(url);
    console.log('fetching', url)
    return fetch('scenemodels/objects/objects.json').then(d => d.json());
  }
}
