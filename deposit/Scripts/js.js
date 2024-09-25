var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    BTime = 120, // 設定倒數秒數
    STime = setInterval("showTime()",1000); //按鈕倒數計時

// 首頁專用
function indeStyle(){
    var pointarry = [],
        winH = $(window).height();

    function chkPoint(num){
        $.each(pointarry,function(index,el){  
            if( num >= el)
            {
                $("#gash-index li").removeClass('on');
                $("#gash-index li:eq("+index+")").addClass('on')
            }
            else if ($(window).height() + $(window).scrollTop() == $('html, body').prop('scrollHeight')) {
                $("#gash-index li").removeClass('on');
                $("#gash-index li:last").addClass('on')
            };
            
        });
    }

    $("section").each(function(index,el){
        pointarry.push($(this).offset().top);
    });

    // console.log(pointarry);

    $('#gash-vision').height(winH);
    $('#news-content').height(winH - 180);

    $("#gash-index li").click(function(event) {
        var targetID = $(this).attr("data-index"),
            scrollT = $("#"+targetID).offset().top;
        if($(this).index() == 0) {
            $body.stop().animate({
                scrollTop: scrollT 
            }, 1000);
        }
        else {
            $body.stop().animate({
                scrollTop: scrollT + 100
            }, 1000);
        }
        
    });

    $('#next-page').click(function(){
        $body.stop().animate({
            scrollTop: $('#gash-shop').offset().top + 100
        }, 1000);
        return false;
    });

    if ($(window).width()>768) {
        setTimeout(function(){ $('.gash-vision-bt').fadeIn(); }, 3500);
        $('#next-page').css('top',winH);
    }
    else {
        $('#next-page').css('top',winH-60);
    }

    $(window).scroll(function() {
        chkPoint($(window).scrollTop());
        if($(window).scrollTop() > 50) {
            $('#next-page').fadeOut();
        }
        else {
            $('#next-page').fadeIn();
        }
        // console.log(pointarry);
    });
}

// 情報站專用
function newStyle(){
    // 情報站slide
    $('#news-slide').flexslider({
        animation: "slide"
    });
    if ($(window).width()<768) {
        $(".slides li img").each(function(){
            var imgID = $(this).attr("data-mobimg");
            $(this).attr("src",imgID);
            // console.log(imgID );
        });
    };
}

// 新聞專用
function newShow(){
    $('#news-bt').click(function() {
        if ($("#news-bt").hasClass('on')) {
            $('#news-content').animate({'right': -450},300);
            $('#news-bt').removeClass('on');
            $('body').css("overflow","");
        }
        else {
            $('#news-content').animate({'right': 0},300);
            $('#news-bt').addClass('on');
            $('body').css("overflow","hidden");
        }
        return false;
    });  
}

// 企業合作頁面專用
function otherStyle(){
    var cooperateID = [];

    $("section.cooperate-list").each(function(index,el){
        cooperateID.push($(this).offset().top);
    });

    // console.log(cooperateID);

    $("#cooperate-content-index li").click(function(event) {
        var listID = $(this).attr("data-index"),
            scrollGo = $(listID).offset().top;
        if ($(window).width()>769) {
            $body.stop().animate({
                scrollTop: scrollGo -50
            }, 1000);
            // console.log(listID);
        }
        else {
            $body.stop().animate({
                scrollTop: scrollGo -80
            }, 1000);
        }
    });
}

// lightBox專用
function lightBox(){
    var pop = $('#popbg');

    $(".openbox").click(function() {
        var boxID = $(this).attr("data-box"),
            lightBox = $("#"+boxID);

        lightBox.fadeIn();
        pop.fadeIn();
        $('body').css("overflow","hidden");
        return false;
    });
    $(".closebox-bt").click(function() {
        $('.closebox').fadeOut();
        pop.fadeOut();
        $('body').css("overflow","");
        return false;
    });

}
// 登入框專用
function logInBox(){
    $("#gash-login-bt").click(function() {
        if ($("#gash-login-bt").hasClass('on')) {
            $("#gash-login-content .close").click();
        }
        else {
            $('#gash-login-content').fadeIn(100);
            $("#gash-login-bt").addClass('on');
        }
        return false;
    });
    $("#gash-login-content .close").click(function() {
        $('#gash-login-content').fadeOut(100);
        $("#gash-login-bt").removeClass('on');
        return false;
    });
}

// 手機選單專用
function mobileMenu(){
    $("#mobile-nav-bt").click(function() {
        if ($("#mobile-nav").hasClass('on')) {
            $('#mobile-nav').animate({'right': 0},300);
            $('#wrapper-content').animate({'right': 0},300);
            $('#mobile-nav-content-w').animate({'right': -240},300);
            $('#gash-main-bt').animate({'right': 0},300);
            $('#mobile-nav').removeClass('on');
        }
        else {
            $('#mobile-nav').animate({'right': 240},300);
            $('#wrapper-content').animate({'right': 240},300);
            $('#mobile-nav-content-w').animate({'right': 0},300);
            $('#gash-main-bt').animate({'right': 240},300);
            $('#mobile-nav').addClass('on');
        }
        
    });
    $('#mobile-nav-content li a').click(function() {
        $(this).next('ul').stop().slideToggle(300);
    });
    
    $(window).resize(function(){
        if ($("#mobile-nav").hasClass('on')&& $(window).width()>768) {
            $('#mobile-nav').css('right','0');
            $('#wrapper-content').css('right','0');
            $('#mobile-nav-content-w').css('right','-240px');
            $('#gash-main-bt').css('right','0');
            $('#mobile-nav').removeClass('on');
        }
    });
}

// Q&A專用
function qa(){
    $('.qa h2').click(function() {
        if ($(this).hasClass('on')) {
            $(this).next('.qa-con').stop().slideUp(200);
            $(this).removeClass('on');
        }
        else {
            $('.qa h2').next('.qa-con').stop().slideUp(200);
            $('.qa h2').removeClass('on');
            $(this).next('.qa-con').stop().slideDown(200);
            $(this).addClass('on');
        }
    });
}

// button倒數
function showTime(){
    BTime -= 1;
    $('button.send-ver span a').html(BTime);
    
    if(BTime==0)
    {
        $('button.send-ver').attr('disabled', false);
        clearInterval(STime);
    }
}

$(function(){

    if($('body').hasClass('index')){
        indeStyle();
    }

    if($('body').hasClass('news')){
        newStyle();
    }

    if($('body').hasClass('other')){
        otherStyle();
    }

    $('button.send-ver span a').html(BTime);
    
    lightBox();
    logInBox();
    mobileMenu();
    newShow();
    qa();
    STime;

});