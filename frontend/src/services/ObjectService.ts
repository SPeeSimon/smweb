import { Feature, FeatureCollection, Point } from "geojson";
import { GeoJsonUtils } from "./GeoJsonUtils";

export class ObjectService {
  constructor(private baseUrl: string) {}

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
    let url = `${this.baseUrl}/objects/list/`;
    if (length) url += Number(length) + "/";
    if (start) url += Number(start);
    console.log("fetching", url);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //     data : data ? JSON.stringify(data) : null,

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        // geojson FeatureCollection
        if (GeoJsonUtils.isGeoPoint(data)) {
          return data.features.map((f) => this.createFGObject(f));
        }
        return [];
      });
    // /objects/:limit/:offset?
    // /objects/ ?e=11&w=11&n=11&s=11
  }

  public search(options, start = 0, length = 20): Promise<FGObject[]> {
    const url = new URL(`${this.baseUrl}/objects/search/`);
    url.searchParams.append("offset", start);
    url.searchParams.append("limit", length);

    const supportedSearchParams = [
      "author",
      "country",
      "description",
      "elevation",
      "elevoffset",
      "heading",
      "lat",
      "lon",
      "model",
      "modelname",
      "modelgroup",
      "modifiedOn",
      "modifiedBefore",
      "modifiedSince",
      "point",
      "tile",
    ];

    Object.keys(options)
      .filter((key) => supportedSearchParams.indexOf(key) != -1)
      .filter(key => options[key] != null)
      .forEach((key) => url.searchParams.append(key, options[key]));

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        // geojson FeatureCollection
        if (GeoJsonUtils.isGeoPoint(data)) {
          return data.features.map((f) => this.createFGObject(f));
        }
        return [];
      });
  }

  public getById(id: string | number): Promise<any> {
    const url = `${this.baseUrl}/objects/${id}`;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }

  public getCountries(): Promise<Country> {
    const url = `${this.baseUrl}/objects/countries`;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }

  public getThumbUrl(id: string | number): string {
    // src="app.php?c=Models&amp;a=thumbnail&amp;id={object.id}"
    return `${this.baseUrl}/model/${id}/thumb.jpg`;
  }
}

export interface FGCountr {
  code: string;
  name: string;
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

// /signs/ (?e=11&w=11&n=11&s=11)
// {
//   'type': 'FeatureCollection',
//   'features': [
//     {
//       'type': 'Feature',
//       'id': row['si_id'],
//       'geometry':{
//         'type': 'Point','coordinates': [row['ob_lon'], row['ob_lat']]
//       },
//       'properties': {
//         'id': row['si_id'],
//         'heading': row['si_heading'],
//         'definition': row['si_definition'],
//         'gndelev': row['si_gndelev'],
//       }
//     }
//   ]
// }

// /navaids/within/ (?e=11&w=11&n=11&s=11)
// {
//   'type': 'FeatureCollection',
//   'features': [
//     {
//       'type': 'Feature',
//       'id': row['si_id'],
//       'geometry':{
//         'type': 'Point','coordinates': [row['na_lon'], row['na_lat']]
//       },
//       'properties': {
//         'id': row['na_id'],
//         'type': row['na_type'],
//         'elevation': row['na_elevation'],
//         'frequency': row['na_frequency'],
//         'range': row['na_range'],
//         'multiuse': row['na_multiuse'],
//         'ident': row['na_ident'],
//         'name': row['na_name'],
//         'airport': row['na_airport_id'],
//         'runway': row['na_runway'],
//       }
//     }
//   ]
// }

// https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters
// "https://github.com/simov/grant"
