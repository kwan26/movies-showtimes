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
                url: "http://showtimes.tiagomestre.pt/api/v1/movies/info/favourites",
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
        
        
        initTest:function(){
            
            
         
        },
        
        initCallWebService:function(){
            
            
            var elOptions = $('.options');
            if(elOptions.length) return false;
            console.log("errors");
            
            var elNoService = $("#feed-empty");
            elNoService.hide();
            
              var  info = [];
             info[0] = 'f9c3071ea95b333';
             info[1] = '60e3dd0bed2523f6';
            
            $.ajax({
               // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                 url: "http://movies.tmestre.local/api/v1/movies/info/favourites",
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
                         
                          $("#movies").append("<div class='' style='color:red'>"+point1+"</div>");
                          for(var moviesshows in item){
                              
                              
                              if(item[moviesshows].movie.trailer.length)
                                  res_trailer = " - <a href='"+item[moviesshows].movie.trailer+"' target='_blank'>Trailer</a>";
                            $("#movies").append(
                                        "<div class='item' data-id='' style='height:170px;'>"+
                                        "<img src='"+item[moviesshows].movie.poster+"' style='height:158px;width:100px;float:left;margin:0 5px 0 0;'>"+
                                        "<span class=''> "+item[moviesshows].movie.name+ "<br />"
                                            +item[moviesshows].movie.info+"<br />"+
                                            item[moviesshows].movie.time+
                                           res_trailer+"</span>"+
                                       
                                       "</div>");  
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


