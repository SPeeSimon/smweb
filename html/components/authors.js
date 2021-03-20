define([
  'knockout', 'text!./authors.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params

    self.start = ko.observable(0)
    self.length = ko.observable(20)

    self.authors = ko.observableArray([])

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
    ko.utils.scenemodels.Authors.getAll(self.start(), self.length() )
    .then(function(data){
      if( !(data && Array.isArray(data)) ) return;
       self.authors(data)
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

