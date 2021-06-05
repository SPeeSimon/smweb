import { AuthorInfo } from "./AuthorService";
import { DateTime } from "luxon";

export class NewsService {
  constructor(private baseUrl: string) {}

  get(id: number | string): Promise<NewsItem> {
    return fetch(`${this.baseUrl}/news/${id}`) // /news/:id
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((response) => {
        return this.mapToNewsItem(response);
      });
  }

  getAll(): Promise<NewsItem[]> {
    return fetch(`${this.baseUrl}/news/list`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
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

export interface NewsItem {
  id: number;
  timestamp: Date;
  author: AuthorInfo;
  text: string;
}
