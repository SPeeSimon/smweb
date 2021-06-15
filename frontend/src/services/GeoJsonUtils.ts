import { FeatureCollection, Point } from "geojson";

export class GeoJsonUtils {
  public static isFeatureCollection(data: any): data is FeatureCollection {
    return data && data.type === "FeatureCollection" && Array.isArray(data.features);
  }

  public static isPoint(data: any): data is Point {
    return data && data.type === "Point" && Array.isArray(data.coordinates);
  }

  public static isGeoPoint(data: any): data is FeatureCollection<Point, any> {
    if (this.isFeatureCollection(data)) {
      if (data.features.length > 0 && data.features.reduce((prev, cur) => prev && this.isPoint(cur.geometry), true)) {
        // all features are Points
        return true;
      }
    }
    return false;
  }
}
