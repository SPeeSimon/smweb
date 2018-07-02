require.config({
    baseUrl : 'b',
    paths : {
      jquery: 'jquery/dist/jquery.min',
      knockout: 'knockout/dist/knockout',
    },
    map: {
      '*': { 'jquery': 'jquery-private.js' },
      'jquery-private.js': { 'jquery': 'jquery' },
    },
    waitSeconds : 30,
})

require([
  'knockout',
  'AuthorsViewmodel.js',
  'StatsViewmodel.js',
], function(ko,AuthorsViewmodel,StatsViewmodel) {

  var authorsViewmodel = new AuthorsViewmodel()
  var statsViewmodel = new StatsViewmodel()
  authorsViewmodel.reload("https://scenery.flightgear.org/")
  statsViewmodel.reload("https://scenery.flightgear.org/")

  ko.applyBindings( authorsViewmodel, document.getElementById('authorslist' ))
  ko.applyBindings( statsViewmodel, document.getElementById('stats' ))

})


