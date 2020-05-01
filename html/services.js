define([
  'knockout', 'jquery',
], function(ko, $ ) {

 function AjaxPromise(type, url, data ) {
    return new Promise(function(resolve,reject) {
      $.ajax(url, {
        data : data ? JSON.stringify(data) : null,
        contentType : 'application/json',
headers: {"Content-Type": "application/json"},
        type : type,
        success : function(data) {
          resolve(data);
        },
        error : function(jqXHR, textStatus, errorThrown) {
          console.log("ajax error",textStatus, errorThrown, jqXHR )
          reject(errorThrown)
        },
      });
    })
  }

  function CRUDRestService(baseUrl) {
    this.baseUrl = baseUrl;
  }

  CRUDRestService.prototype.Create = function(data, cb) {
    return AjaxPromise('POST', this.baseUrl, data, cb)
  }

  CRUDRestService.prototype.GetAll = function(cb) {
    return AjaxPromise('GET', this.baseUrl, null, cb)
  }

  CRUDRestService.prototype.Get = function(id, cb) {
    return AjaxPromise('GET', this.baseUrl + id, null, cb)
  }

  CRUDRestService.prototype.Update = function(data, cb) {
    if (!data || !data._id)
      return Promise.reject("No data or id for update ")
    return AjaxPromise('PUT', this.baseUrl + data._id, data, cb)
  }

  CRUDRestService.prototype.Delete = function(id, cb) {
    if (!id)
      return Promise.reject("No id for update ");
    return AjaxPromise('DELETE', this.baseUrl + id, null, cb)
  }

  function ObjectService( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  ObjectService.prototype.getAll = function( start, length ) {
    var url = this.baseUrl + "/objects/"
    if( length ) url += Number(length)  + "/"
    if( start ) url += Number(start)
    return AjaxPromise( 'GET', url )
  }


  function ModelService( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  ModelService.prototype.getByMg = function(mg,start,length) {
    var self = this
    return AjaxPromise( 'GET', self.baseUrl + "/models/bymg/" + Number(mg) + "/" + length + "/" + start )
  }

  ModelService.prototype.getLatest = function(num) {
    var self = this
    return AjaxPromise( 'GET', self.baseUrl + "/models/list/" + Number(num) )
  }

  ModelService.prototype.getThumbUrl = function(id) {
    return this.baseUrl + "/model/" + Number(id) + "/thumb"
  }

  ModelService.prototype.getByAuthor = function( author, start, length ) {
    var url = this.baseUrl + "/models/search/byauthor/" + Number(author)
    if( length ) url += Number(length) 
    if( start ) url += "/" + Number(start)
    return AjaxPromise( 'GET', url )
  }

  function AuthorService( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  AuthorService.prototype.get= function( id ) {
    return AjaxPromise( 'GET', this.baseUrl + "/author/" + Number(id)  )
  }

  AuthorService.prototype.getAll = function( start, length ) {
    var url = this.baseUrl + "/authors/list/"
    if( length ) url += Number(length)  + "/"
    if( start ) url += Number(start)
    return AjaxPromise( 'GET', url )
  }


  function ModelgroupService( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  ModelgroupService.prototype.getAll = function() {
    var url = this.baseUrl + "/modelgroups/"
    return AjaxPromise( 'GET', url )
  }

  function TerrasyncService( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  TerrasyncService.prototype.getStatus = function() {
    var url = this.baseUrl + "/status"
    return AjaxPromise( 'GET', url )
  }

  function VersionService() {
  }

  VersionService.prototype.getClientVersion = function() {
    return AjaxPromise( 'GET', '/version.json' );
  }


  function Services( baseUrl ) {
    this.baseUrl = baseUrl;
    this.Models = new ModelService( baseUrl );
    this.Objects = new ObjectService( baseUrl );
    this.Authors = new AuthorService( baseUrl );
    this.Modelgroups = new ModelgroupService( baseUrl );
    this.Terrasync = new TerrasyncService( "https://api.flightgear.org/terrasync" );
    this.Version = new VersionService();
  }


  return Services;
});

