define([
  'knockout', 'text!./model-short.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.id = params.id
    self.name = params.name
    self.author = params.author
    self.notes = params.notes
    self.authorId = params.authorId
    self.thumbUrl = ko.utils.scenemodels.Models.getThumbUrl(params.id)
  }

  // Return component definition
  return {
    viewModel : ViewModel,
    template : htmlString
  };
});

