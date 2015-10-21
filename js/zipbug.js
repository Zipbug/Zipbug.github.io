$(document).ready(function () {

	var form = $('#ajax-contact');
	var formMessages = $('#form-messages');
	
	$(".next").click(function (event) {
		$('html, body').animate({
			scrollTop: $(this).offset().top + 70
		}, 2000);
	});
	if ($('.phoneShow').css('display') != 'none') {
		$('.nav').not('.hidden').addClass('hidden');
	}
	$(window).scroll(function () {
		$('.nav').not('.hidden').addClass('hidden');
	});
	$('.showNav').click(function (event) {
		event.preventDefault();
		$('.nav').toggleClass('hidden');
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
});
/* lazyload.js (c) Lorenzo Giuliani
	 * MIT License (http://www.opensource.org/licenses/mit-license.html)
	 *
	 * expects a list of:
	 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
	 */
	 $(function() {
	  var $q = function(q, res){
	        if (document.querySelectorAll) {
	          res = document.querySelectorAll(q);
	        } else {
	          var d=document
	            , a=d.styleSheets[0] || d.createStyleSheet();
	          a.addRule(q,'f:b');
	          for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
	            l[b].currentStyle.f && c.push(l[b]);

	          a.removeRule(0);
	          res = c;
	        }
	        return res;
	      }
	    , addEventListener = function(evt, fn){
	        window.addEventListener
	          ? this.addEventListener(evt, fn, false)
	          : (window.attachEvent)
	            ? this.attachEvent('on' + evt, fn)
	            : this['on' + evt] = fn;
	      }
	    , _has = function(obj, key) {
	        return Object.prototype.hasOwnProperty.call(obj, key);
	      }
	    ;

	  function loadImage (el, fn) {
	    var img = new Image()
	      , src = el.getAttribute('data-src');
	    img.onload = function() {
	      if (!! el.parent)
	        el.parent.replaceChild(img, el)
	      else
	        el.src = src;

	      fn? fn() : null;
	    }
	    img.src = src;
	  }

	  function elementInViewport(el) {
	    var rect = el.getBoundingClientRect()

	    return (
	       rect.top    >= 0
	    && rect.left   >= 0
	    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
	    )
	  }

	    var images = new Array()
	      , query = $q('img.lazy')
	      , processScroll = function(){
	          for (var i = 0; i < images.length; i++) {
	            if (elementInViewport(images[i])) {
	              loadImage(images[i], function () {
	                images.splice(i, i);
	              });
	            }
	          };
	        }
	      ;
	    // Array.prototype.slice.call is not callable under our lovely IE8
	    for (var i = 0; i < query.length; i++) {
	      images.push(query[i]);
	    };

	    processScroll();
	    addEventListener('scroll',processScroll);

	  });