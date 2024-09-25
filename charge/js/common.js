$(function () {
    var a = $(".nav-toggle"),
        b = $(".nav-body"),
        c = $(".nav-search"),
        d = $("#backdrop"),
        e = $(".search-wrap");

    a.on("click", function (a) {
        a.preventDefault(), $(this).toggleClass("is-active"), b.toggle(), e.hide(), "block" == b.css("display") ? d.fadeIn("fast") : d.fadeOut("fast"), "block" == b.css("display") ? "" : b.css("display","")
    }),

    c.on("click", function (c) {
        c.preventDefault(), e.toggle(), e.find(".input-search").focus(), $(window).width() < 960 && ("block" == b.css("display") && (a.toggleClass("is-active"), b.toggle()), "block" == e.css("display") ? d.fadeIn("fast") : d.fadeOut("fast"))
        }),

    d.on("click", function (a) {
        a.preventDefault(), $(this).hide(), b.hide(), e.hide()
        })

});