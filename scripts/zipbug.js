var state = {i: 0,};
var fireEvent = true;
var mobile = false;

(function($) {
  $(document).ready(function() {
    $('html, body').animate({
      scrollTop: 0
    });
    $('.loader').animate({
      opacity: 0
    }, 900, function() {
      $('.loader').remove();
    });

    mobile = $(window).width() <= 1024;
    $(window).resize(function() {
      mobile = $(window).width() <= 1024;
      addEvents();
    });
    addEvents();
    $('.crumb').click(function(e) {
      var index = $(e.currentTarget).index();
      if (fireEvent) onSwipe(index);
    });
  });

  var addEvents = function() {
    if (!mobile) {

      $('.crumb.active').removeClass('active');
      $('.crumb').eq(0).addClass('active');
      $('html, body').animate({
        scrollTop: 0
      });
      state.i = 0;
      $("body").one("mousewheel DOMMouseScroll wheel", function(event) {
        scrollToSection(event)
      });
      $('body').on('touchstart', function(e) {
        onTouch(e)
      });
      $('html, body').off('scroll');

      if (!fireEvent) {
          fireEvent = true;
      }
    } else {
      // fireEvent = false;
      $("body").off("mousewheel DOMMouseScroll wheel");
      $('body').off('touchstart');
      $(document).scroll(function() {
        checkMenu()
      });
    }
  }

  var onSwipe = function(i, f) {

    var firstOrLast = (i <= $('.scroll_section').length - 1 && i >= 0) && state.i !== i;
    if (fireEvent && (firstOrLast || f)) {
      $('.crumb.active, .scroll_section.active').removeClass('active');
      $('.crumb').eq(i).addClass('active');
      $('.scroll_section').eq(i).addClass('active');
      // Turn off scrolling
      fireEvent = false;
      $("body").off("mousewheel DOMMouseScroll scroll wheel");
      $("body").off("touchstart");

      var s = $('.scroll_section').eq(i);

      if (!mobile) {
        bodyAnimate(i, s);
      } else {
        bodyScroll(i, s);
      }

    }else if(i <= $('.scroll_section').length - 1){
      checkTop();
    }
  }

  var bodyScroll = function(i, s) {
    fireEvent = true;
    $('html, body').animate({
      scrollTop: $(s).position().top
    }, 800);

    state.i = i;
  }

  var bodyAnimate = function(i, s) {

    setTimeout(function() {
      fireEvent = true;
      $("body").on("mousewheel DOMMouseScroll wheel", function(event) {
        scrollToSection(event);
      });
    }, 400);

    $('html, body').animate({
      scrollTop: $(s).position().top
    }, 800, function() {

    });
    var bug = Snap('#zipbug');
    if(i == 0){
      setTimeout(function(){
        animateBug(bug, false);
      },600)
    }else{
      animateBug(bug, true);
    }
    if(i === $('.scroll_section').length - 1){
      checkTop();
    }

    state.i = i;
  }

  var checkTop = function(){
    $("body").off("mousewheel DOMMouseScroll wheel");
    $('body').off('touchstart');
    $('.container').one( "mousewheel DOMMouseScroll wheel", function(e) {
      var top = $(this).scrollTop();
      if (e.originalEvent) {
        if (e.originalEvent.wheelDelta) delta = -e.originalEvent.wheelDelta;
        if (e.originalEvent.deltaY) delta = -e.originalEvent.deltaY;
        if (e.originalEvent.detail) delta = e.originalEvent.detail;
      } else {
        delta = window.event.detail;
      }


      var distance = delta < 0 ? 1 : -1;
      var i = Math.min(Math.max(state.i + distance, 0), ($('.scroll_section').length - 1));

      if(top <= 550 && distance == -1){
        $('.container').off( "mousewheel DOMMouseScroll wheel");
        $("body").one("mousewheel DOMMouseScroll wheel", function(event) {
          scrollToSection(event)
        });
        $('body').on('touchstart', function(e) {
          onTouch(e)
        });
        $('html, body').off('scroll');
        onSwipe(i)
      }
    });
  }

  var scrollToSection = function(e) {
    var delta = 0;

    if (e.originalEvent) {
      if (e.originalEvent.wheelDelta) delta = -e.originalEvent.wheelDelta;
      if (e.originalEvent.deltaY) delta = -e.originalEvent.deltaY;
      if (e.originalEvent.detail) delta = e.originalEvent.detail;
    } else {
      delta = window.event.detail;
    }

    var distance = delta < 0 ? 1 : -1;
    var i = Math.min(Math.max(state.i + distance, 0), ($('.scroll_section').length - 1));

    onSwipe(i);
  }

  var checkMenu = function() {
    var docViewTop = $('html, body').scrollTop();
    var farthest = 0
    $('.scroll_section').each(function(i, e) {
      var elemTop = $(this).position().top - 150;
      if (docViewTop >= elemTop && farthest < i) {
        farthest = i;
      }
    })
    if (farthest !== state.i && fireEvent) {
      $('.crumb.active').removeClass('active');
      $('.crumb').eq(farthest).addClass('active');
      $('.scroll_section').eq(farthest).addClass('active');
      state.i = farthest;
    }
  }

  var onTouch = function(e) {
    if (mobile) {
      return false
    }
    var swipe = e.originalEvent.touches,
      start = swipe[0].pageY;

    $(this).on('touchmove', function(e) {
        var contact = e.originalEvent.touches,
          end = contact[0].pageY,
          delta = end - start;

        var distance = delta < 0 ? 1 : -1;
        var i = Math.min(Math.max(state.i + distance, 0), ($('.scroll_section').length - 1));
      })
      .one('touchend', function() {
        $(this).off('touchmove touchend');
      });
  }

  setTimeout(function() {
    var bug = Snap('#zipbug');
    animateBug(bug, false);
  }, 900);
$('#zipbug').click(function(){
  var bug = Snap('#zipbug');
  var l_wing = bug.select('.wing.left'),
    r_wing = bug.select('.wing.right');
    
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    l_wing.animate({
      transform: 'r0,0,0',
    }, 200, mina.linear);
    r_wing.animate({
      transform: 'r0,0,0',
    }, 200, mina.linear);
  } else {
    l_wing.animate({
      transform: 'r120,340,400.5',
    }, 200, mina.linear);
    r_wing.animate({
      transform: 'r-120,640,400.5',
    }, 200, mina.linear);
  }
})

})(jQuery);

function animateBug(bug, close) {
  var l_wing = bug.select('.wing.left'),
    r_wing = bug.select('.wing.right');
  if (close) {
    l_wing.animate({
      transform: 'r0,0,0',
    }, 200, mina.linear);
    r_wing.animate({
      transform: 'r0,0,0',
    }, 200, mina.linear);
  } else {
    l_wing.animate({
      transform: 'r120,340,400.5',
    }, 200, mina.linear);
    r_wing.animate({
      transform: 'r-120,640,400.5',
    }, 200, mina.linear);
  }
}

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
      form.reset();
      button.style = "display: none ";
      status.innerHTML = "Thanks! I'll be in touch soon.";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem. Try again later.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
