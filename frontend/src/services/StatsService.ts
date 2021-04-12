import { Author } from "./AuthorService";

export class StatsService {
  constructor(private baseUrl: string) {}

  public getTopAuthors(): Promise<Author[]> {
    return fetch("/scenemodels/stats/models/byauthor/3/index.json")
    // return fetch(this.baseUrl + "/scenemodels/stats/models/byauthor/3/")
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
    return fetch(this.baseUrl + "/scenemodels/stats/models/byauthor/3/0/1/index.json")
    // return fetch(this.baseUrl + "/scenemodels/stats/models/byauthor/3/0/1")
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
    return fetch(this.baseUrl + "scenemodels/stats/models/byauthor/10/index.json")
    // return fetch(this.baseUrl + "scenemodels/stats/models/byauthor/10/")
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
    return fetch(this.baseUrl + "/scenemodels/stats/index.json")
    // return fetch(this.baseUrl + "/scenemodels/stats/")
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
          },
          stats
        );
      });
  }

  public getAllStats(): Promise<HistoryItem[]> {
    return fetch(this.baseUrl + "/scenemodels/stats/all/index.json")
    // return fetch(this.baseUrl + "/scenemodels/stats/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const stats = (data || { statistics: {} }).statistics || {};
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
}

export interface HistoryItem {
  authors: number;
  date: Date;
  models: number;
  navaids: number;
  objects: number;
  signs: number;
}