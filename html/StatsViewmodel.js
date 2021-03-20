(function(factory) {
  if (typeof define === "function" && define.amd) define(['knockout','jquery'], factory);
  else factory(ko,jQuery);
}(function(ko,$) {

  function ViewModel() {
    var self = this;
    self.numModels = ko.observable(0);
    self.numObjects = ko.observable(0);
    self.numAuthors = ko.observable(0);
    self.numPending = ko.observable(0);
    self.topAuthor = ko.observable([]);
    self.topAuthor90 = ko.observable([]);
  }

  ViewModel.prototype.reload = function( baseUrl ) {
    var self = this;

    $.getJSON( baseUrl + "/scenemodels/stats/models/byauthor/3/", function( data ) {
      self.topAuthor(data.modelsbyauthor)
    })

    $.getJSON( baseUrl + "/scenemodels/stats/models/byauthor/3/0/1", function( data ) {
      self.topAuthor90(data.modelsbyauthor)
    })

    $.getJSON( baseUrl + "/scenemodels/stats/", function( data ) {
      data = data || {};
      stats = data.stats || {}
      self.numModels( stats.models || 0);
      self.numObjects( stats.objects || 0);
      self.numAuthors( stats.authors || 0);
      self.numPending( stats.pending || 0);
    });
  }

  return ViewModel
}))
