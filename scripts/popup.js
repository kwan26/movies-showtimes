// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var QUERY = 'loures';

var moviesGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  /*searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=20', */
    
     searchOnFlickr_: 'http://movies.log.local/api/v1/movies/loures?' +
      'apiKey=debugkey',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestMovies: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.responseType = 'json';
    req.onload = this.showSessions_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showSessions_: function (e) {
      
      var serverResponse = JSON.parse(e.target.responseText);
       
       var i = 0,
           movieshow = new Array();
           moviesrooms = new Array();
           
           var html;
           
        for(var point1 in serverResponse.data){
           
            var item = serverResponse.data[point1];
            
            var element = new Array();
            /*
           
            element["threatre"] = [];
        
            element["threatre"]["session"] = [];
            element["threatre"]["time"] = [];
            element["threatre"]["name"] = [];
            element["threatre"]["title"] = [];
            
            element["threatre"].push(point1);*/
            html = "Sala: "+point1;
             var test = "";
             
             
            var c = $("#feed").show().empty();
             //c.append($("#feedTemplate").mustache({feeds: item}));
             
      
             var tpl = "<h1>{{name}}</h1><p>{{times}}</p>";
  
                var html = Mustache.to_html(tpl, item);
                 $("#movies").html(html);
            /*for(var moviesshows in item){
                
                test +="<div style='height:50px;'>"+html+"<br />Filme: "+item[moviesshows].movie.name+"<br />Sessões: "+item[moviesshows].movie.time+"</div><br />";
                document.getElementById("feed-empty").innerHTML += test;
                //document.write("<div style='height:50px;'>"+html+"<br />Filme: "+item[moviesshows].movie.name+"<br />Sessões: "+item[moviesshows].movie.time+"</div>");
                
             
                
              //element["threatre"]["session"].push({name:item[moviesshows].movie.name,'time':item[moviesshows].movie.time});
     
              i++;
            }
             movieshow.push(element);
             i = 0;*/
         }
        
        
  }

 
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  moviesGenerator.requestMovies();
});
