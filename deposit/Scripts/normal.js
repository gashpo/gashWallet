function Banner() {
    var box = this;
    box.Activity = ActivityToRun;
    box.LoadBanner = LoadBannerToRun;

    function ActivityToRun(link, id) {
        window.open(link);
        $.ajax({
            type: "POST", cache: false, timeout: 20000, async: false, dataType: "json",
            url: "/Home/Click",
            data: { "AdId": id },
            success: function (result) {
                //alert('result');
            },
            error: function (e) {
                //alert('error');
            }
        });
    }
    
    function LoadBannerToRun() {
        var $block = $('#adBlock'),
		    adWidth = $block.width(),
		    $slides = $('ul.list', $block),
		    $li = $('li', $slides),
		    animateTime = 600,
            showTime = 5000,
		    timer,
            stop = false,
		    arrowWidth = 48 * -1,
		    arrowOpacity = 0.5,
            $arrows = $('.arrow', $block).css('opacity', arrowOpacity),
            $prev = $arrows.filter('.prev'),
		    $next = $arrows.filter('.next');

        //image
        $block.hover(function () {
            stop = true;
            clearTimeout(timer);
        }, function () {
            stop = false;
            timer = setTimeout(move, showTime);
        });

        var move = function () {
            var _index = $('.current').index();
            $controllerLi.eq((_index + 1) % $controllerLi.length).click();
        };

        //controller
        if ($li.length > 1) {
            var strLi = '';
            for (var i = 0, j = $li.length; i < j; i++) {
                strLi += '<li class="Controller_' + (i + 1) + '"></li>';
            }
        }

        var $Controller = $('<ul class="Controller"></ul>').html(strLi).appendTo($slides.parent()).css('left', function () {
            return (adWidth - $(this).width()) / 2;
        });

        var BindLiEvent = function (obj) {
            var $this = $(obj);
            $this.addClass('current').siblings('.current').removeClass('current');
            clearTimeout(timer);

            $slides.stop().animate({
                left: adWidth * $this.index() * -1
            }, animateTime, function () {
                if (!stop) timer = setTimeout(move, showTime);
            });
        };

        var $controllerLi = $Controller.find('li').click(function () {
            BindLiEvent($(this));
            return false;
        }).hover(function () {
            BindLiEvent($(this));
        }).eq(0).click().end();

        //arrow          
        $slides.hover(function () {
            var no = $controllerLi.filter('.current').index();
            arrowAction(no > 0 ? 0 : arrowWidth, no < $controllerLi.length - 1 ? 0 : arrowWidth);
        }, function () {
            arrowAction(arrowWidth, arrowWidth);
        });

        $arrows.hover(function () {
            var no = $controllerLi.filter('.current').index();
            arrowAction(no > 0 ? 0 : arrowWidth, no < $controllerLi.length - 1 ? 0 : arrowWidth);
        }, function () {
            arrowAction(arrowWidth, arrowWidth);
        });

        var arrowAction = function (l, r) {
            $prev.stop().animate({ left: l });
            $next.stop().animate({ right: r });
        }

        $arrows.click(function () {
            var $selected = $controllerLi.filter('.current'),
			    no = $selected.index();

            no = this.className.indexOf('prev') > 0 ? no - 1 : no + 1;
            BindLiEvent($controllerLi.eq(no));

            arrowAction(no > 0 ? 0 : arrowWidth, no < $li.length - 1 ? 0 : arrowWidth);
            return false;
        }).focus(function () {
            this.blur();
        });
    }
}

function KnockoutTools() {
    ko.bindingHandlers.date = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var ret = Common.ConvertDate(valueAccessor());
            element.innerHTML = ret;
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        }
    };
}

function GaObject() {
    var box = this;
    box.LoadGa = LoadGaToRun;

    function LoadGaToRun(account) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', account, 'gashpoint.com');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');
    }
}

(function ($) {
    $.banner = new Banner();
    $.banner.LoadBanner();
    $.knockoutTools = new KnockoutTools();
    $.gaObject = new GaObject();

    //Account Menu
    $(".account").mouseover(function () {
        $(".accountMenu").addClass("showArea");
    }).mouseout(function () {
        $(".accountMenu").removeClass("showArea");
    });
} (jQuery));