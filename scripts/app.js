/**
 * Namespace the application
 * @namespace SB
 */
if (!MS)
    var MS = {};
else if (MS && typeof (MS) != "object")
    throw new Error("MS is not an Object type");

/**
 * Constructs Main objects
 * @class Main - is a Singleton
 * @constructor
 * @namespace SB
 */

MS.Main = (function($) {
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
        init: function() {
            _that = this;
            _that.saved_tid = [];
            this.loadInits();

        },
        /**
         * Run all the init methods
         */
        loadInits: function() {
            for (var func in this) {
                if (typeof this[func] == 'function' && func.substr(0, 4) == 'init' && func != 'init') {
                    this[func]();
                }
            }
        },
        inditCheckFavorites: function() {


            var info = [];
            info[0] = 'f9c3071ea95b333';
            info[1] = '60e3dd0bed2523f6';

            var test = _that.initgetOptions();


            $.ajax({
                url: _site + "/api/v2/movies/info/favourites",
                data: {info: test.options},
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend: function() {
                    $("#loading").show();
                },
                success: function(res) {

                    $("#loading").hide();
                },
                error: function(error) {

                }
            });

        },
        initCallWebServiceTheates: function() {

      
            var elOptions = $('.options'),
                    elCheck = $('.addhere');

            if (!elOptions.length)
                return false;
            
             chrome.storage.local.get('notifications', function(data){
               
               if(data.notifications.length) return false;
              
                 if(data.notifications){
                     $('.notif :checked').prop('checked',true);
                 }else{
                      $('.notif :checked').prop('checked',false);
                 }
                // $('.notif :checked').prop('checked',)
             });
            
            
            elCheck.html();

            $.ajax({
                // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                url: _site + "/api/v1/movies/theatres",
                type: 'GET',
                dataType: 'json', // added data type
                beforeSend: function() {
                    $("#loading").show();
                },
                success: function(res) {
                    var jsonResponse = res;
                    $("#loading").hide();

                    for (var movies in jsonResponse) {

                        elCheck.append(" <label class='checkbox'>"
                                + "<input type='checkbox' name='theatres' value='" + jsonResponse[movies].tid + "'class='theatres'>"
                                + jsonResponse[movies].sala
                                + "</label>");

                        //          <label class="checkbox">
                        // <input type="checkbox" name="theatres"> Check me out
                        //</label>
                    }
                    _that.ingetOptions();


                },
                error: function(e) {

                }
            });

        },
        initSaveOptions: function() {

            var btn = $('.btn'),
                    theatres = $('.theatres');

            btn.on('click', function() {

                var allVals = [];


                $('.addhere :checked').each(function() {
                    allVals.push($(this).val());

                });
                var elNotif = false;
                if($('.notif :checked').prop('checked')){
                    elNotif = true;
                }

                chrome.storage.local.set({
                    'options': allVals,
                    'notifications' : elNotif
                });

                if (!allVals.length)
                    console.log("nop");
                window.location = '';

                return false;
            });
        },
        ingetOptions: function() {
            
            
            chrome.storage.local.get('options', function(data) {


                var elOptions = $('.options');

                _that.saved_tid = data;


                if (!elOptions.length)
                    return false;

                $('input[name=theatres]').each(function() {

                    var el = this;


                    for (var i = 0; i < data.options.length; i++) {

                        if ($(el).val() == data.options[i]) {
                            $(el).prop('checked', true);
                        }
                    }

                });


            });

        },
        initOpen: function() {


            var open = $('.open');

            if (!open.length)
                return false;

            open.click(function() {

                chrome.tabs.create({url: "options.html"});
                return false;
            });
        },
        initCallWebService: function() {

            var elNoService = $("#feed-empty"),
                    elOptions = $('.options');

            if (elOptions.length)
                return false;
             $(function() {
                            $( "#tabs" ).tab();
                          });



             $("#settings").click(function() {

                chrome.tabs.create({url: "options.html"});
                return false;
            });

            elNoService.hide();

            var info = [];
            // info[0] = 'f9c3071ea95b333';
            // info[1] = '60e3dd0bed2523f6';

            var ret = new Date();
           
            ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1);
            
            
             
   
            chrome.storage.local.get('options', function(data) {

                info = data.options;

                if (!info.length) {
                    
                    
                        $.ajax({
                    // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                        url: "http://showtimes.tiagomestre.pt/api/v2/movies/info/favourites",

                        type: 'GET',
                        dataType: 'json', // added data type
                        beforeSend: function() {

                          
                            $("#loading-estreias").show();
                            $("#loading-upcoming").show();
                        },
                        success: function(res) {
                         
                             $("#loading-estreias").hide();
                            $("#loading-upcoming").hide();
                            var tmpl_estreias = $('#estreias').html();
                            var tmpl_upcoming = $('#upcoming').html();
                            //var source   = $("#entry-template").html();

                         
                             var template_estreias = Handlebars.compile(tmpl_estreias);

                         result_estreias = template_estreias(res);
                
                         $("#tabs #sessions_estreias").html(result_estreias);
                         
                          var template_upcoming = Handlebars.compile(tmpl_upcoming);
                          result_upcoming = template_upcoming(res);
                          $("#tabs #sessions_upcoming").html(result_upcoming);
                            
                        },
                        error: function(e) {
                            $("#loading").hide();
                            $("#loading-estreias").hide();
                            $("#loading-upcoming").hide();
                            elNoService.show();
                        }
                    });

                    return false;
                }

                $(".header_te").hide();


                $.ajax({
                    // url: "http://movies.log.local/api/v1/movies/loures?apiKey=debugkey",
                    url: "http://showtimes.tiagomestre.pt/api/v2/movies/info/favourites",
                    data: {info: info},
                    type: 'GET',
                    dataType: 'json', // added data type
                    beforeSend: function() {

                        $("#loading").show();
                        $("#loading-estreias").show();
                        $("#loading-upcoming").show();
                    },
                    success: function(res) {

                        $("#divSelect").show();
                         
                        $("#loading-estreias").hide();
                         $("#loading-upcoming").hide();

                        $("#loading").hide();
                        var jsonResponse = res;


                        var tmpl = $('#simple').html();
                        var tmpl_estreias = $('#estreias').html();
                        var tmpl_upcoming = $('#upcoming').html();
                        //var source   = $("#entry-template").html();
                        var template = Handlebars.compile(tmpl);
                        
                         result = template(jsonResponse);
                         console.log(jsonResponse);
                         
                         var template_estreias = Handlebars.compile(tmpl_estreias);
                        
                         result_estreias = template_estreias(jsonResponse);
                        $("#tabs #sessions").html(result);
                        
                        
                         $("#tabs #sessions_estreias").html(result_estreias);
                         
                          var template_upcoming = Handlebars.compile(tmpl_upcoming);
                          result_upcoming = template_upcoming(jsonResponse);
                          $("#tabs #sessions_upcoming").html(result_upcoming);
                          
                       // $("#sessions").html(Mustache.render(tmpl, jsonResponse));
                      
                        $('#selectSala').bind('change', function() {

                            var url = $(this).val(); // get selected value
                           
                            $('html,body').animate({scrollTop: $(url).offset().top}, 'slow');
                            $("#selectSala").val(0);
                        });
                         
                    },
                    error: function(e) {
                        $("#loading").hide();
                        $("#loading-estreias").hide();
                        $("#loading-upcoming").hide();
                        elNoService.show();
                    }
                });
            });
        },
        initNotification:function(){
            
         
            chrome.notifications.create(
              'id1',{   
                  type: 'basic', 
                
                  title: 'Althe Frazon', 
                  message: "Hi, what's going on tonight?",
                
                  priority: 0},
              function() { /* Error checking goes here */} 

            ); 
            
        }
    };
}(jQuery));

// ON DOM READY INIT APPLICATION.
jQuery(document).ready(function() {

    //THE APP MAIN MODULE CODE HAS ALREADY EXECUTED, SO WE CAN ACCESS THE INIT METHOD IMMEDIATELY.
    MS.Main.init();

});
