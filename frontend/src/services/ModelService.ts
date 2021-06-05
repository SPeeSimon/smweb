import { GeoJsonUtils } from "./GeoJsonUtils";

export class ModelService {
  constructor(private baseUrl: string) {}

  public getByModelgroup(modelgroup: number, limit?: number | string, offset?: number | string): Promise<FGModel[]> {
    const url = `${this.baseUrl}/models/bymg/$modelgroup/$limit/$offset`;
    return fetch("scenemodels/models/list/20/index.json").then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }

  public getLatest(num: number): Promise<FGModel[]> {
    return fetch(`${this.baseUrl}/models/list/${num}`) // /models/list/:limit/:offset?
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      });
  }

  public getThumbUrl(id: number | string): string {
    return `${this.baseUrl}/model/${id}/thumb.jpg`;
  }

  public getByAuthor(author: number | string, start?: number, length?: number): Promise<any[]> {
    let url = `${this.baseUrl}/models/search/byauthor/${author}`;
    if (length) url += length;
    if (start) url += "/" + start;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }

  /**
   * getModelFile
   */
  public getModelFile(id: number) {
    // /model/:id/tgz
  }

  /**
   * getPositions
   */
  public getPositions(id: number) {
    // /model/:id/positions
  }

  /**
   * getById
   */
  public getById(id: number) {
    // /model/:id
    // FeatureCollection
    // GeoJsonUtils.isFeatureCollection
  }

  // /models/datatable ?draw=11&start=11&length=11&search=abc&order=1-6
  // {
  //   'draw': draw,
  //   'recordsTotal': count,
  //   'recordsFiltered': search == '' ? count : j.length,
  //   'data': [
  //   {
  //     'id': row.mo_id,
  //     'filename': row.mo_path,
  //     'name': row.mo_name,
  //     'notes': row.mo_notes,
  //     'shared': row.mo_shared,
  //     'modified': row.mo_modified,
  //   }
  // ],
  // }
  // /models/search/:pattern (mo_path like $1 or mo_name like $1 or mo_notes)
  // {
  //   'id': row.mo_id,
  //   'filename': row.mo_path,
  //   'name': row.mo_name,
  //   'notes': row.mo_notes,
  //   'shared': row.mo_shared,
  //   'modified': row.mo_modified,
  // }

  // '/models/search/byauthor/:id/:limit?/:offset?'
  // {
  //   'id': row.mo_id,
  //   'filename': row.mo_path,
  //   'name': row.mo_name,
  //   'notes': row.mo_notes,
  //   'shared': row.mo_shared,
  //   'modified': row.mo_modified,
  //   'author': row.au_name,
  //   'authorId': row.mo_author,
  // }

  // /navdb/airport/:icao
  //   {
  //     'runwaysGeometry': {
  //         'type': 'GeometryCollection',
  //         'geometries': []
  //     },
  //     'procedures': []
  // }

  // /submission
  // /submission/:id
}

export interface FGModel {
  id: number;
  filename: string;
  name: string;
  notes: string;
  shared: number;
  modified: Date;
  author: string;
  authorId: number;
}
