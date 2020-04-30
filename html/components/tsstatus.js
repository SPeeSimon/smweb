define([
  'knockout', 'text!./tsstatus.html', 'jquery',
], function(ko, htmlString, $ ) {

  function ViewModel( params ) {
    var self = this

    self.params = params

    self.data = ko.observableArray([]);
    self.dirs = ko.observableArray([]);
    self.reload()
  }

  ViewModel.prototype.reload = function() {
    var self = this

    function prepareHashes( data ) {
      const dirs = [];

      data.forEach( di => {
        if( !(di.dirindex && di.dirindex.d)) return;
        for( d in di.dirindex.d ) {
          if( !dirs.includes(d) ) dirs.push(d);
        }
      });
      return dirs.sort();
    }

    ko.utils.scenemodels.Terrasync.getStatus()
    .then(function(data){
      if( !(data && Array.isArray(data)) ) return;
       data.sort((a,b)=> {return a.url.localeCompare(b.url);});
       self.dirs(prepareHashes(data));
       self.data(data);
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

