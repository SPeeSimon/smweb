import { FeatureCollection, Point } from "geojson";
import { GeoJsonUtils } from "./GeoJsonUtils";

export class ScenemodelsService {
  constructor(private baseUrl: string) {}

  public getModelById(id: number | string): Promise<FGModel> {
    return fetch(`${this.baseUrl}/model/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(this.convertToModelContent);

    // $.getJSON( this.params.baseUrl + "scenemodels/model/" + this.id(), function( data ) {
    //   if( !data ) return;
    //   this.name = data.name
    //   this.description = data.notes
    //   this.author = data.notes
    //   this.type = data.shared
    //   this.modified = data.modified
    //   var c = []
    //   if( data.content && Array.isArray(data.content) )
    //     data.content.forEach(function(e) {
    //       c.push( new ModelContent(e) )
    //     })
    //   this.content = c
    // })
  }

  private convertToModelContent(data: any): FGModel {
    //   let c = []
    //   if( data.content && Array.isArray(data.content) )
    //     data.content.forEach(function(e) {
    //       c.push( new ModelContent(e) )
    //     })
    //   this.content = c
    return data;
  }

  public getPositionsById(id: number | string): Promise<ModelPosition[]> {
    return fetch(`${this.baseUrl}/model/${id}/positions`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        // geojson FeatureCollection
        if (GeoJsonUtils.isGeoPoint(data)) {
          return data;
        }
      })
      .then((data) => {
        // map to geojson Feature/Point
        if (data)
          return data.features.map(
            (f) =>
              new ModelPosition(f.geometry.coordinates[1], f.geometry.coordinates[0], f.properties.country, f.properties.gndelev)
          );
        return [];
      });
  }
}

export class ModelPosition {
  constructor(public latitude: any, public longitude: any, public country: any, public elevation: any) {}
}

export interface Content {
  filename: string;
  filesize: number;
}

export interface FGModel {
  id: number;
  filename: string;
  modified: Date;
  authorId: number;
  name: string;
  notes: string;
  shared: number;
  author: string;
  content: Content[];
}
