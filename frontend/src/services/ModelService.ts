export class ModelService {
  constructor(private baseUrl: string) {}

  public getByModelgroup(mg: number, start: string | number, length: string | number): Promise<Response> {
    return fetch("scenemodels/models/list/20/index.json")
    // return fetch(this.baseUrl + "/models/bymg/" + mg + "/" + length + "/" + start)
          .then(d => d.json());
  }

  public getLatest(num: number): Promise<any[]> {
    return fetch("/scenemodels/models/list/20/index.json")
    // return fetch(this.baseUrl + "/models/list/" + num)
    .then(d => d.json());
  }

  public getThumbUrl(id: number): string {
    if (id % 2 ==0 )
      return this.baseUrl + "/scenemodels/model/"+id+"/thumb";
    return this.baseUrl + "/scenemodels/model/7985/thumb";
    // return this.baseUrl + "/model/" + id + "/thumb";
  }

  public getByAuthor(author: number, start?: number, length?: number): Promise<any[]> {
    let url = this.baseUrl + "/models/search/byauthor/" + author;
    if (length) url += length;
    if (start) url += "/" + start;
    // return fetch(url).then(d => d.json());
    return fetch('/scenemodels/models/search/byauthor/models.json').then(d => d.json());
  }
}
