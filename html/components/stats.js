define([
  'knockout', 'text!./stats.html', 'jquery', 'flot-time', 'flot-pie'
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params
    self.numModels = ko.observable(0)
    self.numObjects = ko.observable(0)
    self.numAuthors = ko.observable(0)
    self.numPending = ko.observable(0)
    self.numElev = ko.observable(0)
    self.topAuthor = ko.observable([])
    self.topAuthor90 = ko.observable([])
    self.statsLoading = ko.observable(false);
    self.historyLoading = ko.observable(false);
    self.authorsLoading = ko.observable(false);

    $("<div id='hst-tooltip'></div>").css({
      position: "absolute",
      display: "none",
      border: "1px solid #fdd",
      padding: "2px",
      "background-color": "#fee",
      opacity: 0.80
    }).appendTo("body");

    self.reload()
  }

  ViewModel.prototype.reloadStats = function() {
    var self = this
    self.statsLoading(true);
    $.getJSON( self.params.baseUrl + "scenemodels/stats/", function( data ) {
      self.statsLoading(false);
      data = data || {}
      stats = data.stats || {}
      self.numModels( stats.models || 0)
      self.numObjects( stats.objects || 0)
      self.numAuthors( stats.authors || 0)
      self.numPending( stats.pending || 0)
      self.numElev( stats.elev || 0)
    });
  }

  ViewModel.prototype.reloadTopAuthors = function() {
    var self = this
    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/3/", function( data ) {
      self.topAuthor(data.modelsbyauthor)
    })
    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/3/0/1", function( data ) {
      self.topAuthor90(data.modelsbyauthor)
    })
  }

  ViewModel.prototype.reloadAuthors = function() {
    var self = this;
    self.authorsLoading(true);
    $.getJSON( self.params.baseUrl + "scenemodels/stats/models/byauthor/10/", function( mba ) {
      self.authorsLoading(false);
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

  ViewModel.prototype.reloadHistory = function() {
    var self = this
    self.historyLoading(true);
    $.getJSON( self.params.baseUrl + "scenemodels/stats/all", function( data ) {
      self.historyLoading(false);
      if( !(data&&data.statistics) ) return
      var models = []
      var objects = []
      data.statistics.forEach(function(e){
        var t = new Date(e.date).getTime()
        models.push([t,e.models])
        objects.push([t,e.objects])
      })

      $.plot($("#charts-hst"), [{
            data: models,
            label: "Models",
            color: "red",
            yaxis: 1,
          },{
            data: objects,
            label: "Objects",
            color: "blue",
            yaxis: 2,
          }], {
            yaxes: [{
                position: "left",
                tickFormatter: function (v, axis) {
                  return v.toFixed(0)/1e3 + "k";
    },
              },{
                position: "right",
                alignTicksWithAxis: 1,
                tickFormatter: function (v, axis) {
                  return v.toFixed(0)/1e6 + "M";
    },
            }],
            xaxis: {
              mode: "time",
              timeBase: "milliseconds",
            },
            legend: {
              show: true,
              position: "nw",
            },
            grid: {
              hoverable: true,
              // clickable: true,
            },
      })
      $("#charts-hst").bind("plothover", function (event, pos, item) {
        if (item) {
          var x = item.datapoint[0].toFixed(2),
              y = item.datapoint[1].toFixed(2);

          $("#hst-tooltip").html(new Date(parseInt(x)).toLocaleDateString({ year: '2-digit', month: '2-digit', day: '2-digit' }) + ": "
                            + Number(y).toFixed(0) + " "  +item.series.label)
            .css({top: item.pageY+5, left: item.pageX+5})
            .fadeIn(200);
        }
      });

      $("#charts-hst").mouseleave( function(event,pos, item) {
        $("#hst-tooltip").hide();
      })
    })
  }

  ViewModel.prototype.reload = function() {
    var self = this

    self.reloadStats()
    self.reloadTopAuthors()
    self.reloadAuthors()
    self.reloadHistory()
  }

//    ViewModel.prototype.dispose = function() {
//    }

  // Return component definition
  return {
    viewModel : ViewModel,
    template : htmlString
  };
});

