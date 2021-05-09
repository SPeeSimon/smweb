import { Feature, FeatureCollection, Point } from "geojson";

export class ObjectService {
  constructor(private baseUrl: string) {}

  private isFeatureCollection(data: any): data is FeatureCollection {
    return data && data.type === "FeatureCollection" && Array.isArray(data.features);
  }

  private isPoint(data: any): data is Point {
    return data && data.type === "Point" && Array.isArray(data.coordinates);
  }

  private isGeoPoint(data: any): data is FeatureCollection<Point, ObjectProperties> {
    if (this.isFeatureCollection(data)) {
      if (data.features.length > 0 && data.features.reduce((prev, cur) => prev && this.isPoint(cur.geometry), true)) {
        // all features are Points
        return true;
      }
    }
    return false;
  }

  private createFGObject(f: Feature<Point, ObjectProperties>): FGObject {
    return {
      id: Number(f.id),
      modelId: f.properties.model_id,
      modelName: f.properties.model_name,
      elevation: f.properties.gndelev,
      elevOffset: f.properties.elevoffset,
      heading: f.properties.heading,
      shared: f.properties.shared,
      stg: f.properties.stg,
      country: f.properties.country,
      title: f.properties.title,
      longitude: f.geometry.coordinates[0],
      latitude: f.geometry.coordinates[1],
    };
  }

  public getAll(start = 0, length = 20): Promise<FGObject[]> {
    let url = this.baseUrl + "/objects/";
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    console.log("fetching", url);
    return fetch("scenemodels/objects/objects.json")
      .then((d) => d.json())
      .then((data) => {
        // geojson FeatureCollection
        if (this.isGeoPoint(data)) {
          return data.features.map((f) => this.createFGObject(f));
        }
        return [];
      });
  }

  public getById(id: string | number): Promise<any> {
    const url = this.baseUrl + "/object/" + id;
    console.log("fetching", url);
    return fetch("scenemodels/objects/object.json").then((d) => d.json());
  }
}

export interface ObjectProperties {
  id: number;
  heading: string;
  title: string;
  gndelev: string;
  elevoffset: string;
  model_id: number;
  model_name: string;
  shared: number;
  stg: string;
  country: string;
}

export interface FGObject {
  id: number;
  modelId: number;
  modelName: string;
  elevation: string;
  elevOffset: string;
  heading: string;
  shared: number;
  stg: string;
  country: string;
  title: string;
  longitude: number;
  latitude: number;
}
