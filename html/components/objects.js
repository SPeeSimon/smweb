define([
  'knockout', 'text!./objects.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params

    self.start = ko.observable(0)
    self.length = ko.observable(20)
    self.objects = ko.observableArray([])

    self.reload()
  }

  ViewModel.prototype.next = function(a) {
    this.start( this.start() + this.length() )
    this.reload()
  }

  ViewModel.prototype.prev = function(a) {
    this.start( Math.max(0,this.start() - this.length()) )
    this.reload()
  }


  ViewModel.prototype.reload = function() {
    var self = this
    ko.utils.scenemodels.Objects.getAll(self.start(), self.length() )
    .then(function(data){
      if( !(data && data.type === "FeatureCollection" && data.features && Array.isArray(data.features))) return
      var objs = []
      data.features.forEach(function(f) {
        objs.push({
          id: f.id,
          modelId: f.properties.model_id,
          modelName: f.properties.model_name,
          elevation: f.properties.gndelev,
          elevOffset: f.properties.elevoffset,
          heading: f.properties.heading,
          shared: f.properties.shared,
          stg: f.properties.stg,
          country: f.properties.country,
          shared: f.properties.shared,
          title: f.properties.title,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1],
        })
      })
      self.objects(objs)
    })
    .catch(function(err){
      //TODO: notify user
    })
  }

//    ViewModel.prototype.dispose = function() {
//    }

  // Return component definition
  return {
    viewModel : ViewModel,
    template : htmlString
  };
});

