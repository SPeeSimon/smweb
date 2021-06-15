import { jsonResponseOrError } from "./ServiceUtil";

export class VersionService {
  getClientVersion(): Promise<ClientVersion> {
    return fetch("/version.json")
      .then(jsonResponseOrError)
      .then((json) => json as ClientVersion);
  }
}

export interface ClientVersion {
  client: string;
}
