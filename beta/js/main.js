$(document).ready(function () {
    scrollToElement($("#main"), false);
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3000);

    $('nav a').click(function () {
        var t_id = $(this).data('id'),
            target = $("#" + t_id);

        scrollToElement(target, true);
    });

    $(window).resize(function () {
        $('.scroll-body').stop();
        scrollToElement($('.active'), false);
    });
//    $('.gallery-item').hover(function () {
//            $(this).find('.overlay').animate({
//                opacity: 0
//            }, 300);
//        },
//        function () {
//            $(this).find('.overlay').animate({
//                opacity: 1
//            }, 300);
//        });
//    $('.gallery-item').click(function () {
//        $(this).find('.flip').animate({
//            textIndent: 0
//        }, {
//            step: function (now, fx) {
//                $(this).css('-webkit-transform', 'rotateY(' + now + 'deg)');
//            },
//            duration: "slow"
//        }, 'linear');
//    });
});

Snap.load('/beta/Zip-Bug-wingged.svg', function (bug) {
    var z_bug = Snap('.zipbug-shell');
    z_bug.append(bug);
    $(document).ready(function () {
        setTimeout(function () {
            animateBug(bug);
        }, 3600);
    });
});


function animateBug(bug) {
    var l_wing = bug.select('.wing.left'),
        r_wing = bug.select('.wing.right');

    l_wing.animate({
        transform: 'r120,340,400.5',
    }, 200, mina.linear);
    r_wing.animate({
        transform: 'r-120,640,400.5',
    }, 200, mina.linear);
}

function scrollToElement(ele, animate) {
    var $w_top = $('.scroll-body').scrollTop() + ele.offset().top,
        $w_left = $('.scroll-body').scrollLeft() + ele.offset().left,
        timeout = animate ? 1000 : 0;

    $('.active').removeClass('active');
    ele.addClass('active');
    var scale = 0.08;
   
    $('.scroll-body').addClass('scale-up').animate({
        scrollTop: $w_top,
        scrollLeft: $w_left,
    }, timeout, function(){
        $('.scroll-body').removeClass('scale-up');
    });
}