export class VersionService {

  getClientVersion(): Promise<ClientVersion> {
    return fetch("/version.json")
            .then(data => data.json())
            .then(json => json as ClientVersion);
  }
}


export interface ClientVersion {
  client: string;
}