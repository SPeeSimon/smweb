export class CRUDRestService {
  constructor(private baseUrl: string) {}

  Create(data: any): Promise<Response> {
    const request = new Request(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    // return AjaxPromise('POST', this.baseUrl, data, cb)
    return fetch(request);
  }

  GetAll(): Promise<Response> {
    return fetch(this.baseUrl);
  }

  Get(id: number): Promise<Response> {
    return fetch(this.baseUrl + id);
  }

  Update(data: any): Promise<Response> {
    if (!data || !data._id) return Promise.reject("No data or id for update ");

    const request = new Request(this.baseUrl + data._id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    // return new AjaxPromise('PUT', this.baseUrl + data._id, data, cb).get()
    return fetch(request);
  }

  Delete(id: number): Promise<Response> {
    if (!id) return Promise.reject("No id for update ");

    const request = new Request(this.baseUrl + id, { method: "DELETE" });
    return fetch(request);
  }
}
