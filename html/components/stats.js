define([
  'knockout', 'text!./stats.html', 'jquery','flot-pie'
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params
    self.numModels = ko.observable(0)
    self.numObjects = ko.observable(0)
    self.numAuthors = ko.observable(0)
    self.numPending = ko.observable(0)
    self.topAuthor = ko.observable([])
    self.topAuthor90 = ko.observable([])

    self.reload()
  }

  ViewModel.prototype.reload = function() {
    var self = this

    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/3/", function( data ) {
      self.topAuthor(data.modelsbyauthor)
    })
    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/3/0/1", function( data ) {
      self.topAuthor90(data.modelsbyauthor)
    })
    $.getJSON( self.params.baseUrl + "scenemodels/stats/", function( data ) {
      data = data || {}
      stats = data.stats || {}
      self.numModels( stats.models || 0)
      self.numObjects( stats.objects || 0)
      self.numAuthors( stats.authors || 0)
      self.numPending( stats.pending || 0)
    });

    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/10/", function( mba ) {
      var data = []
      mba.modelsbyauthor.forEach(function(m){
        data.push({
          label: m.author,
          data: m.count,
        })
      })

      $.plot($("#stats-mba"), data, {
        series: {
          pie: { 
            show: true,
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
        },
      })
      $("#stats-mba").bind("plothover", function(event,pos, item) {
        if( item ) $("#stats-mba").attr("title",item.series.label)
        else $("#stats-mba").attr("title","")
      })
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

