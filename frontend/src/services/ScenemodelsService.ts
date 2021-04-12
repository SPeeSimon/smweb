export class ScenemodelsService {
    constructor(private baseUrl: string) {}
  
    public getModelById(id: number): Promise<any> {
        return fetch("scenemodels/model/model.json")
        // return fetch(this.baseUrl + "scenemodels/model/" + id)
            .then(response => response.json())
            .then(this.convertToModelContent)

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

    private convertToModelContent(data: any) {
    //   let c = []
    //   if( data.content && Array.isArray(data.content) )
    //     data.content.forEach(function(e) {
    //       c.push( new ModelContent(e) )
    //     })
    //   this.content = c
      return data;
    }
  
    public getPositionsById(id: number): Promise<ModelPosition[]> {
        return fetch("scenemodels/model/positions.json")
        // return fetch(this.baseUrl + "scenemodels/model/" + id + "/positions")
        .then(response => response.json())
        .then(data => {
            if( data && data.type === "FeatureCollection" && data.features && Array.isArray(data.features) ) {
                return data
            }
        })
        .then(data => {
            if( data && data.type === "FeatureCollection" && data.features && Array.isArray(data.features) ){
                return data.features.map(f => 
                    new ModelPosition(f.geometry.coordinates[1], f.geometry.coordinates[0], f.properties.country, f.properties.gndelev))
            }
            return []
        })
    }

}
  
export class ModelPosition {
    constructor(public latitude: any,
        public longitude: any,
        public country: any,
        public elevation: any) {
    }
}
