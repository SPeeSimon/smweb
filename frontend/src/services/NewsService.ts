import { AuthorInfo } from "./AuthorService";
import { DateTime } from "luxon";
import { jsonResponseOrError } from "./ServiceUtil";

export class NewsService {
  constructor(private baseUrl: string) {}

  get(id: number | string): Promise<NewsBlogItem> {
    return fetch(`${this.baseUrl}/news/${id}`) // /news/:id
      .then(jsonResponseOrError)
      .then((response) => {
        return this.mapToNewsItem(response);
      });
  }

  getAll(): Promise<NewsBlogItem[]> {
    return fetch(`${this.baseUrl}/news/list`)
      .then(jsonResponseOrError)
      .then((response) => {
        return [...response].map(this.mapToNewsItem);
      });
  }

  private mapToNewsItem(entry : any) {
    return Object.assign({}, entry, {
      timestamp: DateTime.fromISO(entry.timestamp),
      text: entry.text.replace(/\\n/g, "<br>"),
    });
  }
}

export interface NewsBlogItem {
  id: number;
  timestamp: Date;
  author: AuthorInfo;
  text: string;
}
