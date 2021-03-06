import { jsonResponseOrError } from "./ServiceUtil";

export class TerrasyncService {
  constructor(private baseUrl: string) {}

  getStatus(): Promise<TerrasyncRoot[]> {
    const url = `${this.baseUrl}/ts/status/`;
    return fetch(url).then(jsonResponseOrError).then(json => Array.from(json.entries));
  }
}

export interface TerrasyncData {
  Details: string;
  Roads: string;
  Buildings: string;
  Pylons: string;
  Airports: string;
  Models: string;
  Objects: string;
  Terrain: string;
}

export interface TerrasyncContainer {
  version: string;
  path: string;
  d: TerrasyncData;
  time: string;
}

export interface TerrasyncProvider {
  flags: string;
  service: string;
  regexp: string;
  replacement: string;
  order: number;
  preference: number;
  url: string;
}

export interface TerrasyncRoot {
  url: string;
  dirindex: TerrasyncContainer;
  dns: TerrasyncProvider;
}
