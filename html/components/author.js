define([
  'knockout', 'text!./author.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params

    self.id = ko.observable()
    self.name = ko.observable()
    self.notest = ko.observable()

    self.start = ko.observable(0)
    self.length = ko.observable(20)
    self.models = ko.observableArray([])

    self.cantWrite = ko.observable(false)

    ko.computed(function() {
      self.id( self.params.id() )
      self.reload()
    })
  }

  ViewModel.prototype.reload = function() {
    var self = this
    ko.utils.scenemodels.Authors.get(self.id() )
    .then(function(data){
      if( !data ) return;
      self.name(data.name)
      self.notes(data.notes)
    })
    .catch(function(err){
      //TODO: notify user
    })
    ko.utils.scenemodels.Models.getByAuthor(self.id(), self.length(), self.start() )
    .then(function(data){
      if( !(data && Array.isArray(data)) ) return;
      self.models(data)
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

