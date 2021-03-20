define([
  'knockout', 'text!./contribute.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params
  }

  ViewModel.prototype.reload = function() {
    var self = this

/*
    $.getJSON( self.params.baseUrl + "scenemodels/model/" + self.id(), function( data ) {
      if( !data ) return;
      self.name(data.name)
      self.description(data.notes)
      self.author(data.notes)
      self.type(data.shared)
      self.modified(data.modified)
      var c = []
      if( data.content && Array.isArray(data.content) ) data.content.forEach(function(e) {
        c.push( new ModelContent(e) )
      })
      self.content(c)
    })
    $.getJSON( self.params.baseUrl + "scenemodels/model/" + self.id() + "/positions", function( data ) {
      var p = []
      if( data && data.type === "GeometryCollection" && data.geometries && Array.isArray(data.geometries) ) data.geometries.forEach(function(g) {
        p.push( new ModelPosition(g) )
      })
      self.positions(p)
    })
*/
  }

//    ViewModel.prototype.dispose = function() {
//    }

  // Return component definition
  return {
    viewModel : ViewModel,
    template : htmlString
  };
});

