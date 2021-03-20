define([
  'knockout', 'text!./home.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this
    self.params = params

    self.latestModels = ko.observableArray([]);

    self.reload()
  }

  ViewModel.prototype.reload = function() {
    var self = this
    ko.utils.scenemodels.Models.getLatest(20)
    .then(function(data){
      self.latestModels(data) 
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

