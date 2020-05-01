require.config({
    baseUrl : '.',
    paths : {
      jquery: 'https://code.jquery.com/jquery-3.3.1.min',
      'jquery-ui': 'https://code.jquery.com/ui/1.12.1/jquery-ui.min',
      knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
      sammy: 'https://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.6/sammy.min',
      text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
      bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',
      'flot-time': 'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.time.min',
      'flot-pie': 'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.pie.min',
      'flot': 'https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min',

    },
    map: {
    },
    waitSeconds : 30,
    shim : {
        bootstrap : { "deps" :['jquery'] },
        'jquery-ui' : { "deps" :['jquery'] },
        'flot' : { "deps" :['jquery'] },
        'flot-pie' : { "deps" :['flot'] },
        'flot-time' : { "deps" :['flot'] },
    },
})

require([
  'knockout',
  'sammy',
  'services.js',
  'text!./version.json',
  'bootstrap',
  'jquery-ui',
], function(ko,sammy,services,version) {

  var clientVersion = JSON.parse(version).client;

  var toplinks = [
    { name: 'author',  args: 1 },
    { name: 'authors', args: 0 },
    { name: 'contribute', args: 0 },
    { name: 'home',    args: 0 },
    { name: 'model',   args: 1 },
    { name: 'models',  args: 0 },
    { name: 'object',  args: 1 },
    { name: 'objects', args: 0 },
    { name: 'stats',   args: 0 },
    { name: 'tsstatus',args: 0 }
  ]

  var components = [
    'model-short',
  ]

  ko.utils.scenemodels = new services('https://scenery.flightgear.org/scenemodels')

  toplinks.forEach(function(w) {
    ko.components.register(w.name, {
      require : 'components/' + w.name
    });
  })
  components.forEach(function(c) {
    ko.components.register(c, {
      require : 'components/' + c
    });
  })

  function ViewModel(baseUrl) {
    var self = this

    self.updateAvailable = ko.observable(false);

    self.leftWidget = ko.observable('home')
    self.leftWidgetParams = { baseUrl: baseUrl, id: ko.observable() }

    self.rightWidget = ko.observable('stats')
    self.rightWidgetParams = { baseUrl: baseUrl }

    setInterval( function() { self.checkClientVersion()}, 3600*1000 );
  }

  ViewModel.prototype.checkClientVersion = function() {
    var self = this;
    ko.utils.scenemodels.Version.getClientVersion()
    .then(function(data) {
      self.updateAvailable(clientVersion !== data.client);
    })
    .catch(function(err) {
      console.log("can't get client version", err);
    });
  }

  ViewModel.prototype.isActiveLeft = function(a,b) {
    return a === this.leftWidget()
  }

  var viewModel = new ViewModel('https://scenery.flightgear.org/' )
  ko.applyBindings( viewModel )//, document.getElementById('content' ))

  sammy(function() {
    toplinks.forEach(function(w) {

      switch( w.args ) {
        case 0:
          this.get('#' + w.name, function() {
            viewModel.leftWidget(w.name)
          });
          break;
        case 1:
          this.get('#' + w.name + '/:id', function() {
            viewModel.leftWidgetParams.id( this.params.id );
            viewModel.leftWidget(w.name)
          });
          break;
      }
    },this)
    // empty route
    this.get('', function() {
      this.app.runRoute('get', '#home' );
    });
  }).run();
})


