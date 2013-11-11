/**
 * Namespace the application
 * @namespace SB
 */
if (!OPT) var OPT = {};
else if (OPT && typeof (OPT) != "object") throw new Error("OPT is not an Object type");

/**
 * Constructs Main objects
 * @class Main - is a Singleton
 * @constructor
 * @namespace SB
 */

OPT.Main = (function ($) {
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
        
        initCheckFavorites:function(){
            
             
           var  info = [];
             info[0] = 'hi';
             info[1] = 'hello';
            
            
             $.ajax({
                url: "http://movies.tmestre.local/api/v1/movies/info/favourites",
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
        
        insitCallWebService:function(){
            
            var elNoService = $("#feed-empty");
            elNoService.hide();
            
            $.ajax({
                url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function(res) {
                 $("#loading").hide();
                    var jsonResponse = res;
                        
                      for(var point1 in jsonResponse.data){
                          var item = jsonResponse.data[point1];
                         
                          $("#movies").append("<div class='' style='color:red'>"+point1+"</div>");
                          for(var moviesshows in item){
                              
                            $("#movies").append(
                                        "<div class='item' data-id='' style='height:170px;'>"+
                                        "<img src='"+item[moviesshows].movie.poster+"' style='height:158px;width:100px;float:left;margin:0 5px 0 0;'>"+
                                        "<span class=''> "+item[moviesshows].movie.name+ "<br />"
                                            +item[moviesshows].movie.info+"<br />"+
                                            item[moviesshows].movie.time+"</span>"+
                                       
                                       "</div>");
                                        
                                 
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
    OPT.Main.init();
   
});


