define([
  'knockout', 'text!./model.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ModelContent( params ) {
    var self = this
    params = params || {}
    self.filename = ko.observable( params.filename )
    self.filesize = ko.observable( params.filesize )
  }

  function ModelPosition( params ) {
    var self = this
    params = params || { }
    self.latitude =  params.geometry.coordinates[1]
    self.longitude =  params.geometry.coordinates[0]
    self.country =  params.properties.country
    self.elevation =  params.properties.gndelev
  }

  function ViewModel( params ) {
    var self = this

    self.params = params
    self.id = ko.observable()
    self.name = ko.observable()
    self.description = ko.observable()
    self.type = ko.observable()
    self.author = ko.observable()
    self.modified = ko.observable()
    self.content = ko.observableArray()
    self.positions = ko.observableArray()

    self.cantWrite = ko.observable(true)

    ko.computed(function() {
      self.id( self.params.id() )
      self.reload()
    })
  }

  ViewModel.prototype.fullscreen = function() {
    if ( document.fullscreenEnabled || 
	document.webkitFullscreenEnabled || 
	document.mozFullScreenEnabled ||
	document.msFullscreenEnabled) {
      var i = document.getElementById("Model3DViewBody");
      if (i.requestFullscreen) {
        i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
      }
    }
  }

  ViewModel.prototype.reload = function() {
    var self = this

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
      if( data && data.type === "FeatureCollection" && data.features && Array.isArray(data.features) ) data.features.forEach(function(f) {
        p.push( new ModelPosition(f) )
      })
      self.positions(p)
    })
  }

//    ViewModel.prototype.dispose = function() {
//    }

  // Return component definition
  return {
    viewModel : {
      createViewModel: function(params, componentInfo) {
        $(componentInfo.element).find('.modal-content').resizable({
          //alsoResize: ".modal-dialog",
          minHeight: 300,
          minWidth: 300
        });
        $(componentInfo.element).find('.modal-dialog').draggable();
        return new ViewModel(params);
      }
    },
    template : htmlString
  };
});

