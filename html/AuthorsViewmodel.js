(function(factory) {
  if (typeof define === "function" && define.amd) define(['knockout','jquery'], factory);
  else factory(ko,jQuery);
}(function(ko,$) {

  function AuthorViewmodel() {
    var self = this;
    self.id = ko.observable()
    self.name = ko.observable()
    self.notes = ko.observable()
    self.models = ko.observable()
  }

  function Viewmodel() {
    var self = this
    self.authors = ko.observableArray()
    self.baseUrl = ko.observable()
    self.pageOffset = ko.observable(0)
    self.pageLength = ko.observable(20)
  }

  Viewmodel.prototype.firstPage = function() {
    this.pageOffset(0)
    this.reload(this.baseUrl(),this.pageLength(), this.pageOffset() )
  }

  Viewmodel.prototype.prevPage = function() {
    this.pageOffset( Math.max(0,this.pageOffset() - this.pageLength()) )
    this.reload(this.baseUrl(),this.pageLength(), this.pageOffset() )
  }

  Viewmodel.prototype.nextPage = function() {
    this.pageOffset( this.pageOffset() + this.pageLength() )
    this.reload(this.baseUrl(),this.pageLength(), this.pageOffset() )
  }

  Viewmodel.prototype.lastPage = function() {
  }

  Viewmodel.prototype.reload = function(baseUrl) {
    var self = this
    self.baseUrl(baseUrl)
    $.getJSON( self.baseUrl() + "scenemodels/authors/list/" + self.pageLength() + "/" + self.pageOffset(), function(data) {
      if( !Array.isArray(data) ) return
      var a = []
      data.forEach(function(author){
        var  vm = new AuthorViewmodel()
        vm.id(author.id)
        vm.name(author.name)
        vm.notes(author.notes)
        vm.models(author.models)
        a.push(vm)
      })
      self.authors(a)
    });
  }

  return Viewmodel
}))
