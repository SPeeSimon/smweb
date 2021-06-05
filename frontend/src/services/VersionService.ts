export class VersionService {
  getClientVersion(): Promise<ClientVersion> {
    return fetch("/version.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((json) => json as ClientVersion);
  }
}

export interface ClientVersion {
  client: string;
}
