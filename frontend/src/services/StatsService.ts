import { Author } from "./AuthorService";
import { jsonResponseOrError, urlWithOptionalLimitOffset } from "./ServiceUtil";

export class StatsService {
  constructor(private baseUrl: string) {}

  public getTopAuthors(): Promise<Author[]> {
    return this.getAuthorStats(3);
  }

  public getTopAuthors90(): Promise<Author[]> {
    return this.getAuthorStats(3, 0, 90);
  }

  public getTop10Authors(): Promise<Author[]> {
    return this.getAuthorStats(10);
  }

  public getAuthorStats(limit: number, offset?: number, days?: number): Promise<Author[]> {
    if (offset === undefined && days) {
      offset = 0;
    }
    const url = urlWithOptionalLimitOffset(`${this.baseUrl}/stats/models/byauthor`, limit, offset, days); // /stats/models/byauthor/:limit?/:offset?/:days?
    return fetch(url)
    .then(jsonResponseOrError)
      .then((data) => {
        return data.modelsbyauthor || [];
      });
  }

  public getTotals(): Promise<ScenemodelStats> {
    return fetch(`${this.baseUrl}/stats/`)
       .then(jsonResponseOrError)
      .then((data) => {
        const stats = (data || { stats: {} }).stats || {};
        return Object.assign(
          {
            authors: 0,
            elev: 0,
            models: 0,
            navaids: 0,
            objects: 0,
            pending: 0,
          },
          stats
        );
      });
  }


  public getAllStats(): Promise<HistoryItem[]> {
    return fetch(`${this.baseUrl}/stats/all`)
      .then(jsonResponseOrError)
      .then((data) => {
        const stats = (data || { statistics: {} }).statistics || [];
        return Array.from(stats);
      })
      .then((stats) => {
        return stats.map((item) => Object.assign(item, { date: new Date(item.date) }) as HistoryItem);
      });
  }
// /stats/all
// { statistics: [
//   {
//     'date' : row.st_date,
//     'objects': row.st_objects,
//     'models':  row.st_models,
//     'authors': row.st_authors,
//     'signs': row.st_signs,
//     'navaids': row.st_navaids,
//   }
// ] }


  public getModelsByCountry(): Promise<ModelsByCountryStat[]> {
    return fetch(`${this.baseUrl}/stats/models/bycountry`)
      .then(jsonResponseOrError)
      .then((data) => {
        return data.modelsbycountry || [];
      });
  }

}

export interface ScenemodelStats {
  models: number;
  objects: number;
  authors: number;
  pending: number;
  elev: number;
}

export interface HistoryItem {
  authors: number;
  date: Date;
  models: number;
  navaids: number;
  objects: number;
  signs: number;
}

export interface ModelsByCountryStat {
  name : string;
  id : string | number;
  density: number;
  count: number;
}

// /stats/models/bycountry
// { modelsbycountry: [
//   {
//     'name' : row.co_name.trim(),
//     'id' : row.co_three.trim(),
//     'density': Number(row.density),
//     'count': Number(row.count),
//   }
// ] }
