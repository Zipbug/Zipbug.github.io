$(document).ready(function () {
  var d = new Date();
  var n = d.getFullYear();
  $('.date').text(n);
  $('.trigger').click(function (event) {
    event.preventDefault();
    $('.main-nav').toggleClass('open');
  });
  $('.contact-link, .close-contact').click(function (event) {
    event.preventDefault();
    $('.overlay, .contact').toggleClass('hidden fade-in-fast');
  });
  $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
  $('.r_input').blur(function () {
    if (!$(this).val())
      $(this).addClass('warning').next('label').addClass('warning');
    else
      $(this).removeClass('warning').next('label').addClass('filled').removeClass('warning');
  });
  $('#phone').blur(function () {
    if ($(this).val())
      $(this).next('label').addClass('filled');
  });
  $("#contact-form").submit(function () {
    var errors = 0;
    $('.r_input').map(function () {
      if (!$(this).val()) {
        $(this).addClass('warning').next('label').addClass('warning');
        errors++;
      } else if ($(this).val()) {
        $(this).removeClass('warning').next('.warning').removeClass('warning');
      }
    });
    if (errors > 0) {
      $('.response').text("The red feilds are required").addClass('warnging');
      return false;
    } else {
      $('.warning').removeClass('warning');
      $.ajax({
        dataType: 'jsonp',
        url: "https://getsimpleform.com/messages/ajax?form_api_token=736387eef38da6ef6867f9638055e07b",
        data: $('#contact-form').serialize(),
        success: function () {
          $('.response').addClass('success').text("Thank you for contacting us, we will be in touch shortly.");
          $('input').val("");
        },
        error: function () {
          $('.response').addClass('warning').text("Sorry but we were unable to proccess your submition. Please try again later");
        }
      })
      return false; //to stop the form from submitting
    }
  });
});
/* lazyload.js (c) Lorenzo Giuliani
 * MIT License (http://www.opensource.org/licenses/mit-license.html)
 *
 * expects a list of:
 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
 */
$(function () {
  var $q = function (q, res) {
      if (document.querySelectorAll) {
        res = document.querySelectorAll(q);
      } else {
        var d = document,
          a = d.styleSheets[0] || d.createStyleSheet();
        a.addRule(q, 'f:b');
        for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
          l[b].currentStyle.f && c.push(l[b]);

        a.removeRule(0);
        res = c;
      }
      return res;
    },
    addEventListener = function (evt, fn) {
      window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent) ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
    },
    _has = function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };

  function loadImage(el, fn) {
    var img = new Image(),
      src = el.getAttribute('data-src');
    img.onload = function () {
      if (!!el.parent)
        el.parent.replaceChild(img, el)
      else
        el.src = src;
      el.classList.add("fade-in");
      fn ? fn() : null;
    }
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  var images = new Array(),
    query = $q('img.lazy'),
    processScroll = function () {
      for (var i = 0; i < images.length; i++) {
        if (elementInViewport(images[i])) {
          loadImage(images[i], function () {
            images.splice(i, i);
          });
        }
      };
    };
  // Array.prototype.slice.call is not callable under our lovely IE8
  for (var i = 0; i < query.length; i++) {
    images.push(query[i]);
  };

  processScroll();
  addEventListener('scroll', processScroll);

});