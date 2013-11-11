/**
 * Namespace the application
 * @namespace SB
 */
if (!MS) var MS = {};
else if (MS && typeof (MS) != "object") throw new Error("MS is not an Object type");

/**
 * Constructs Main objects
 * @class Main - is a Singleton
 * @constructor
 * @namespace SB
 */

MS.Main = (function ($) {
     // PRIVATE ATTRIBUTES. ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
    var _that = {};
    var _site = "http://showtimes.tiagomestre.pt";

    // PRIVATE MEMBERS. ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE.

    //RETURN OBJECT LITERAL.
    return {
        // PUBLIC ATTRIBUTES ANYONE MAY READ/WRITE.
        NAME: "Application initialize module",
        VERSION: 1.0,

        // PUBLIC MEMBERS ANYONE MAY READ/WRITE. (MAY BE OVERRIDEN).
        // PUBLIC METHOD THAT INITIALIZES MAIN APP.
        init: function () {
            this.loadInits();
            _that = this;
        },
        
         /**
        * Run all the init methods
        */
        loadInits: function () {
            for (var func in this) {
                if (typeof this[func] == 'function' && func.substr(0, 4) == 'init' && func != 'init') {
                    this[func]();
                }
            }
        },
        
        inditCheckFavorites:function(){
            
             
           var  info = [];
             info[0] = 'f9c3071ea95b333';
             info[1] = '60e3dd0bed2523f6';
            
            
             $.ajax({
                url: _site+"/api/v1/movies/info/favourites",
                data: {info:info},
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(res) {
                 
                          $("#loading").hide();
                },
                error:function(error){
                    
                }
            });
            
        },
        
        initCallWebServiceTheates:function(){
            
            
            var elOptions = $('.options');
            
            
            $.ajax({
               // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                 url: _site+"/api/v1/movies/theatres",
              
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend:function(){
                    
                },
                success: function(res) {
                     var jsonResponse = res;
                     
                      for(var movies in jsonResponse){
                          
                          //          <label class="checkbox">
                           // <input type="checkbox" name="theatres"> Check me out
                          //</label>
                      }
                     
                       
                },
                error:function(e){
                    
                }
             });
            
        },
        
        
        initCallWebService:function(){
            
            var elNoService = $("#feed-empty"),
                 elOptions = $('.options');
         
            if(elOptions.length) return false;
            
            
            elNoService.hide();
            
              var  info = [];
             info[0] = 'f9c3071ea95b333';
             info[1] = '60e3dd0bed2523f6';
        
            $.ajax({
               // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                 url: "http://showtimes.tiagomestre.pt/api/v1/movies/info/favourites",
                 data: {info:info},
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(res) {
                 $("#loading").hide();
                    var jsonResponse = res;
                        
                      var res_trailer;  
                      for(var point1 in jsonResponse.data){
                          var item = jsonResponse.data[point1];
                         
                          $("#movies").append("<h4><span class='label label-danger'>"+point1+"</span></h4>");
                          for(var moviesshows in item){
                              
                              if(item[moviesshows].movie.trailer.length)
                                   res_trailer = "<a href='"+item[moviesshows].movie.trailer+"' target='_blank' class='btn btn-primary btnNext'>Trailer</a><h4>" 
                               
                              $("#movies").append("<div class='row'>"
                                    +""
                                    +"<div class='col-md-2 col-sm-3 text-center'>"
                                     +"<img  src='"+item[moviesshows].movie.poster+"' style='width:100px;height:159px' class='img-rounded'></a>"
                                     +"<div class='info'><h3>"+item[moviesshows].movie.name+"</h3>"
                              
                                          +"<small style='font-family:courier,\'new courier\';' class='btn btn-primary btnNext'>"+item[moviesshows].movie.time+"</small>"
                                       
                                    +"</h4>"
                            
                                   +"<h4><span class='label label-default'>"+item[moviesshows].movie.info+"</span></h4>"
                                       + res_trailer
                                    +"</div></div>"
                                 
                                  +"</div><hr>");
                             // if(item[moviesshows].movie.trailer.length)
                          //        res_trailer = " - <a href='"+item[moviesshows].movie.trailer+"' target='_blank'>Trailer</a>";
                          //  $("#movies").append(
                          //              "<div class='item' data-id='' style='height:170px;'>"+
                          //              "<img src='"+item[moviesshows].movie.poster+"' style='height:158px;width:100px;float:left;margin:0 5px 0 0;'>"+
                          //              "<span class=''> "+item[moviesshows].movie.name+ "<br />"
                          //                  +item[moviesshows].movie.info+"<br />"+
                          //                  item[moviesshows].movie.time+
                          //                 res_trailer+"</span>"+
                                       
                         //              "</div>");  
                         //      res_trailer = "";
                         res_trailer = "";
                            }
                            
                      }
                },
                error:function(e){
                     $("#loading").hide();
                     elNoService.show();
                }
             });
            
        }
    };
} (jQuery));

// ON DOM READY INIT APPLICATION.
jQuery(document).ready(function () {

    //THE APP MAIN MODULE CODE HAS ALREADY EXECUTED, SO WE CAN ACCESS THE INIT METHOD IMMEDIATELY.
    MS.Main.init();
   
});


