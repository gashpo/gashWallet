var iconSize = [],
    lessSize = false;

$(document).ready(function(){
  var resizeElem = '.icon, .logo-block .logo, input[type="checkbox"] + label span';
  $(resizeElem).each(function(){
    iconSize[getDomPath(this)+'.width'] = $(this).width();
    iconSize[getDomPath(this)+'.down.width'] = $(this).width();
    iconSize[getDomPath(this)+'.height'] = $(this).height();
    iconSize[getDomPath(this)+'.down.height'] = $(this).height();
  });
  bodyWidth(resizeElem);
  $(window).resize(function(){
    bodyWidth(resizeElem);
  });

  $('.slideToggles.slide').click(function(e){
    $this = $(this);
    $parent = $this.parent().parent();
    e.preventDefault();
    $(this).parent().siblings('.slide-form').slideToggle({
      start: function(){
        textIndent = 180;
        if ($this.find('p.slide-arrow').hasClass('down')) {
          textIndent = 0;
        }
        $this.find('p.slide-arrow').animate({ textIndent: textIndent }, {
          step: function(now, fx) {
            $(this).css('transform','rotate('+now+'deg)');
          },
          complete: function() {
            if ($this.find('p.slide-arrow').hasClass('down')) {
              $this.find('p.slide-arrow').removeClass('down');
            } else {
              $this.find('p.slide-arrow').addClass('down');
            }
            $(this).css({'text-indent':'', 'transform':''})
          }
        });
      },
      complete: function(){
        if ($parent.hasClass('up')) {
          $parent.removeClass('up');
        } else {
          $parent.addClass('up');
        }
      }
    });
  });

  $('.invoice').change(function(){
    $('.invoice-' + $(this).val()).show().siblings().hide();
    if ($(this).val() != 1) {
      if ($('.invoice-' + $(this).val() + ' .get-invoice').is(':checked')) {
        $('.invoice-address').show();
      } else {
        $('.invoice-address').hide();
      }
    } else {
      $('.invoice-address').hide();
    }
  });
  $('.get-invoice').click(function(){
    if ($(this).is(':checked')) {
      $('.invoice-address').show();
    } else {
      $('.invoice-address').hide();
    }
  });
  $('.vehicle').change(function(){
    $('.vehicle' + $(this).val()).show().siblings().hide();
    veinChecks('.vehicle', $(this).val());
  });
  veinChecks('.invoice', $('.invoice').val());
  veinChecks('.vehicle', $('.vehicle').val());
});

function veinChecks(element, val) {
  if (element == '.invoice' && val != 1 && $('.invoice-' + val + ' .get-invoice').is(':checked')) {
    $('.invoice-address').show();
  } else {
    $('.invoice-address').hide();
  }
  $(element+'-'+val).show().siblings().hide();
}

function bodyWidth(element) {

  var $width = $(window).width(),
      $containerWidth = 640;

  if ($width <= 640) {
    $size = (($width / $containerWidth) * 100);
    $('body').css('font-size', $size + '%');
    $(element).each(function(){
      $(this).css({
        width: (iconSize[getDomPath(this)+'.width'] * ($size / 100)) + 'px',
        height: (iconSize[getDomPath(this)+'.height'] * ($size / 100)) + 'px'
      });
    });
    lessSize = true;
  } else if (lessSize) {
    $('body').css('font-size','');
    $(element).each(function(){
      $(this).css({
        width: '',
        height: ''
      });
    });
    lessSize = false;
  }

}

function getDomPath($this) {
  return $this.tagName.toLowerCase()+'.'+$this.className.replace(/ /g, '.');
}

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-88941313-3', 'auto');
ga('send', 'pageview');