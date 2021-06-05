import { Author } from "./AuthorService";

export class StatsService {
  constructor(private baseUrl: string) {}

  public getTopAuthors(): Promise<Author[]> {
    return fetch(`${this.baseUrl}/stats/models/byauthor/3/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        return data.modelsbyauthor || [];
      });
  }

  public getTopAuthors90(): Promise<Author[]> {
    return fetch(`${this.baseUrl}/stats/models/byauthor/3/0/1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        return data.modelsbyauthor || [];
      });
  }

  public getTop10Authors(): Promise<Author[]> {
    return fetch(`${this.baseUrl}/stats/models/byauthor/10/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        return data.modelsbyauthor || [];
      });
  }


  public getTotals(): Promise<ScenemodelStats> {
    return fetch(`${this.baseUrl}/stats/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const stats = (data || { stats: {} }).stats || {};
        return Object.assign(
          {
            models: 0,
            objects: 0,
            authors: 0,
            pending: 0,
            elev: 0,
          },
          stats
        );
      });
  }

  public getAllStats(): Promise<HistoryItem[]> {
    return fetch(`${this.baseUrl}/stats/all`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const stats = (data || { statistics: {} }).statistics || [];
        return Array.from(stats)
      })
      .then(stats => {
        return stats.map(item => Object.assign(item, {date: new Date(item.date)}) as HistoryItem);
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

// /stats/
// { 
//   'stats': {
//     'objects': row.objects || 0,
//     'models':  row.models || 0,
//     'authors': row.authors || 0,
//     'navaids': row.navaids || 0,
//     'pending': row.pends || 0,
//     'elev': row.gndelevs || 0,
//   }
// }

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

// /stats/models/byauthor/:limit?/:offset?/:days?
// { modelsbyauthor: [
//   {
//     'author' : row.au_name.trim(),
//     'author_id' : Number(row.au_id),
//     'count': Number(row.count),
//   }
// ] }


// /stats/models/bycountry
// { modelsbycountry: [
//   {
//     'name' : row.co_name.trim(),
//     'id' : row.co_three.trim(),
//     'density': Number(row.density),
//     'count': Number(row.count),
//   }
// ] }
