"use strict";
function renderFeeds() {
    showLoader(), popupGlobal.backgroundPage.getFeeds(popupGlobal.backgroundPage.appGlobal.options.forceUpdateFeeds, function(a, b) {
        if ($("#loading").hide(), $("#feed-saved").hide(), popupGlobal.feeds = a, b === !1)
            showLogin();
        else if ($("#popup-content").show(), $("#website").text(chrome.i18n.getMessage("FeedlyWebsite")), popupGlobal.backgroundPage.appGlobal.options.abilitySaveFeeds && $("#popup-content").addClass("tabs"), 0 === a.length)
            $("#feed-empty").text(chrome.i18n.getMessage("NoUnreadArticles")), $("#feed-empty").show(), $("#all-read-section").hide();
        else {
            popupGlobal.backgroundPage.appGlobal.options.resetCounterOnClick && popupGlobal.backgroundPage.resetCounter(), $("#feed").css("font-size", popupGlobal.backgroundPage.appGlobal.options.popupFontSize / 100 + "em"), $("#feed-empty").hide();
            var c = $("#feed").show().empty();
            c.append($("#feedTemplate").mustache({feeds: a})), $(".mark-read").attr("title", chrome.i18n.getMessage("MarkAsRead")), $("#mark-all-read").text(chrome.i18n.getMessage("MarkAllAsRead")), $("#all-read-section").show().find("*").show(), $(".show-content").attr("title", chrome.i18n.getMessage("More")), c.find(".timeago").timeago()
        }
    })
}
function renderSavedFeeds() {
    $("#mark-all-read").hide().siblings(".icon-ok").hide(), showLoader(), popupGlobal.backgroundPage.getSavedFeeds(popupGlobal.backgroundPage.appGlobal.options.forceUpdateFeeds, function(a, b) {
        if ($("#loading").hide(), $("#feed").hide(), $("#feed-saved").empty(), popupGlobal.savedFeeds = a, b === !1)
            showLogin();
        else if ($("#popup-content").show(), 0 === a.length)
            $("#feed-empty").text(chrome.i18n.getMessage("NoSavedArticles")), $("#feed-empty").show();
        else {
            $("#feed-saved").css("font-size", popupGlobal.backgroundPage.appGlobal.options.popupFontSize / 100 + "em"), $("#feed-empty").hide();
            var c = $("#feed-saved").show();
            c.append($("#feedTemplate").mustache({feeds: a})), c.find(".show-content").attr("title", chrome.i18n.getMessage("More")), c.find(".timeago").timeago(), c.find(".mark-read").hide()
        }
    })
}
function markAsRead(a) {
    for (var b = $(), c = 0; c < a.length; c++)
        b = b.add(".item[data-id='" + a[c] + "']");
    b.fadeOut("fast", function() {
        $(this).remove()
    }), b.attr("data-is-read", "true"), 0 === $("#feed").find(".item[data-is-read!='true']").size() && showLoader(), popupGlobal.backgroundPage.markAsRead(a, function() {
        0 === $("#feed").find(".item[data-is-read!='true']").size() && renderFeeds()
    })
}
function showLoader() {
    $("body").children("div").hide(), $("#loading").show()
}
function showLogin() {
    $("body").children("div").hide(), $("#login-btn").text(chrome.i18n.getMessage("Login")), $("#login").show()
}
var popupGlobal = {supportedTimeAgoLocales: ["ru", "fr", "pt-BR", "it", "cs"],feeds: [],savedFeeds: [],backgroundPage: chrome.extension.getBackgroundPage()};
$(document).ready(function() {
    popupGlobal.backgroundPage.appGlobal.options.abilitySaveFeeds && $("#feedly").children("button").show(), -1 !== popupGlobal.supportedTimeAgoLocales.indexOf(window.navigator.language) ? $.getScript("/scripts/timeago/locales/jquery.timeago." + window.navigator.language + ".js", function() {
        renderFeeds()
    }) : renderFeeds()
}), $("#login").click(function() {
    popupGlobal.backgroundPage.getAccessToken()
}), $("#feed, #feed-saved").on("mousedown", "a", function(a) {
    var b = $(this);
    if (1 === a.which || 2 === a.which) {
        var c = !(a.ctrlKey || 2 === a.which);
        chrome.tabs.create({url: b.data("link"),active: c}, function() {
            popupGlobal.backgroundPage.appGlobal.options.markReadOnClick === !0 && b.hasClass("title") === !0 && $("#feed").is(":visible") && markAsRead([b.closest(".item").data("id")])
        })
    }
}), $("#popup-content").on("click", "#mark-all-read", function() {
    var a = [];
    $(".item").each(function(b, c) {
        a.push($(c).data("id"))
    }), markAsRead(a)
}), $("#feed").on("click", ".mark-read", function() {
    var a = $(this).closest(".item");
    markAsRead([a.data("id")])
}), $("#feedly").on("click", "#btn-feeds-saved", function() {
    $(this).addClass("active-tab"), $("#btn-feeds").removeClass("active-tab"), renderSavedFeeds()
}), $("#feedly").on("click", "#btn-feeds", function() {
    $(this).addClass("active-tab"), $("#btn-feeds-saved").removeClass("active-tab"), renderFeeds()
}), $("#popup-content").on("click", ".show-content", function() {
    var a = $(this), b = a.closest(".item"), c = b.find(".content"), d = b.data("id");
    if ("" === c.html()) {
        for (var e, f = $("#feed").is(":visible") ? popupGlobal.feeds : popupGlobal.savedFeeds, g = 0; g < f.length; g++)
            f[g].id === d && (e = f[g].content);
        e && (c.html(e), c.find("a").each(function(a, b) {
            var c = $(b);
            c.data("link", c.attr("href")), c.attr("href", "javascript:void(0)")
        }))
    }
    c.slideToggle(function() {
        a.css("background-position", c.is(":visible") ? "-288px -120px" : "-313px -119px"), c.is(":visible") && c.text().length > 350 ? ($(".item").css("width", "700px"), $("#feedly").css("width", "700px"), $(".article-title, .blog-title").css("width", $("#popup-content").hasClass("tabs") ? "645px" : "660px")) : ($(".item").css("width", $("#popup-content").hasClass("tabs") ? "380px" : "350px"), $("#feedly").css("width", $("#popup-content").hasClass("tabs") ? "380px" : "350px"), $(".article-title, .blog-title").css("width", $("#popup-content").hasClass("tabs") ? "325px" : "310px"))
    })
}), $("#feedly").on("click", "#update-feeds", function() {
    $(".icon-refresh").css("background", "url(/images/loading16.gif)"), $("#feed").is(":visible") ? popupGlobal.backgroundPage.getFeeds(!0, function(a, b) {
        if (b) {
            for (var c = [], d = 0; d < a.length; d++)
                0 === $("#feed .item[data-id='" + a[d].id + "']").size() && c.push(a[d]);
            $("#feed").prepend($("#feedTemplate").mustache({feeds: c})).find(".timeago").timeago(), popupGlobal.feeds = popupGlobal.feeds.concat(c)
        } else
            showLogin();
        $(".icon-refresh").css("background", "")
    }) : popupGlobal.backgroundPage.getSavedFeeds(!0, function(a, b) {
        if (b) {
            for (var c = $("#feed-saved"), d = [], e = 0; e < a.length; e++)
                0 === $("#feed-saved .item[data-id='" + a[e].id + "']").size() && d.push(a[e]);
            $("#feed-saved").prepend($("#feedTemplate").mustache({feeds: d})).find(".timeago").timeago(), c.find(".mark-read").hide(), popupGlobal.savedFeeds = popupGlobal.savedFeeds.concat(d)
        } else
            showLogin();
        $(".icon-refresh").css("background", "")
    })
}), $("#popup-content").on("click", ".save-feed", function() {
    var a = $(this), b = a.closest(".item"), c = b.data("id"), d = !a.data("saved");
    popupGlobal.backgroundPage.toggleSavedFeed(c, d), a.data("saved", d), a.toggleClass("saved")
}), $("#popup-content").on("click", "#website", function() {
    popupGlobal.backgroundPage.openFeedlyTab()
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


