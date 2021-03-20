(function(factory) {
  if (typeof define === "function" && define.amd) define(['knockout','jquery'], factory);
  else factory(ko,jQuery);
}(function(ko,$) {

  function ViewModel() {
    var self = this;
    self.latestModels = ko.observableArray([]);
    self.latestModels2 = ko.observableArray();
  }

  ViewModel.prototype.reload = function(baseUrl) {
    var self = this
    $.getJSON( baseUrl + "scenemodels/models/list/20", function(data) {
      data.forEach(function(d) {
        d.thumbUrl = function() {
          return baseUrl + "/scenemodels/model/" + d.id + "/thumb";
        }
      })

      self.latestModels(data) 
      self.latestModels2.removeAll()
      for( var i = 0; i < data.length; i++ ) {
        var m2 = [ data[i++] ];
        if( i < data.length )
          m2.push( data[i] )
        self.latestModels2.push( m2 );
      }
    });
  }

  return ViewModel
}))
