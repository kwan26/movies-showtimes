// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
 Displays a notification with the current time. Requires "notifications"
 permission in the manifest file (or calling
 "webkitNotifications.requestPermission" beforehand).
 */
function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.

    $.ajax({
        url: "http://showtimes.tiagomestre.pt/api/v2/movies/info/favourites",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
                
            var allVals = [];
            var date_premiere;    
            var poster;
            for (var i = 0; i < res.estreias.length; i++) {
             
              date_premiere = res.date_premiere;
              allVals.push(" - "+res.estreias[i].nome_pt);
              
               /*   var notification = window.webkitNotifications.createNotification(
                        res.estreias[i].poster, // The image.
                        "Estreias da Semana "+date_premiere, // The title.
                       res.estreias[i].nome_pt    // The body.
                        );
                    notification.show();
             */ 
                  
            }
            
              poster = res.estreias[Math.floor(Math.random()*res.estreias.length)];
           
            
            var notification = window.webkitNotifications.createNotification(
                       poster.poster, // The image.
                        "Estreias da Semana "+date_premiere, // The title.
                        allVals.reverse().join("\n")    // The body.
                        );
            notification.show();
            
            var num = res.estreias.length;
            
             chrome.browserAction.setBadgeText({
                    text: num.toString()
                });

        },
        error: function(e) {
            chrome.browserAction.setBadgeText({
                    text:""
                });

        }
    });
    // notification.show();
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
}


var ret = new Date();


chrome.storage.local.get('notifications', function(data) {

    if (data.notifications === undefined){
        if (window.webkitNotifications && (ret.getDay() >= 2 && ret.getDay() <= 4)) {
            // While activated, show notifications at the display frequency.
            if (JSON.parse(localStorage.isActivated)) {
                show();
            }
           
        }
        return false;
    }

    if (data.notifications) {

        // Test for notification support.
        if (window.webkitNotifications && (ret.getDay() >= 2 && ret.getDay() <= 4)) {
            // While activated, show notifications at the display frequency.
            if (JSON.parse(localStorage.isActivated)) {
                show();
            }

        }

    }
});


