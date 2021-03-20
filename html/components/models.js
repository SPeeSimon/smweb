define([
  'knockout', 'text!./models.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params
    self.modelgroups = ko.observableArray([])

    self.selectedMg = ko.observable()
    self.start = ko.observable(0)
    self.length = ko.observable(20)
    self.models = ko.observableArray([])

    self.modelsLoading = ko.observable(false);
    self.modelGroupsLoading = ko.observable(false);

    self.reload()

    self.selectAll = function(a,b) {
      self.selectedMg(null)
    }

    self.select = function(a,b) {
      self.selectedMg(a)
    }

    self.isSelected = function(mg) {
      if( !mg ) return ! self.selectedMg()
      if( !self.selectedMg() ) return false
      return mg.id == self.selectedMg().id
    }

    ko.computed(function() {
      var selected = self.selectedMg()
      if( !selected ) return //FIXME!
      self.reloadModels( selected.id, self.start(), self.length() )

    })
  }

  ViewModel.prototype.reloadModels = function( mg, start, length ) {
    var self = this
    self.modelsLoading(true);

    ko.utils.scenemodels.Models.getByMg( mg, start, length )
    .then(function(data){
      self.modelsLoading(false);
      if( !(data  && Array.isArray(data)) ) return;
      self.models( data )
    })
    .catch(function(err){
      //TODO: notify user
    })
  }
  ViewModel.prototype.reload = function() {
    var self = this
    self.modelGroupsLoading(true);

    ko.utils.scenemodels.Modelgroups.getAll()
    .then(function(data){
      self.modelGroupsLoading(false);
      if( !(data  && Array.isArray(data)) ) return;
      self.modelgroups( data )
      if( data.length ) {
        self.select(data[0])
      }
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

