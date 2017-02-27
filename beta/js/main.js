$(document).ready(function () {
    var lastLocation = window.location.hash ? window.location.hash : "#main";
    scrollToElement($(lastLocation), false);
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3000);

    $('nav a').click(function (event) {
        event.preventDefault();
        var t_id = $(this).data('id'),
            target = $("#" + t_id);

        scrollToElement(target, true);
    });

    $(window).resize(function () {
        $('.scroll-body').stop();
        setTimeout(function () {
            scrollToElement($('section.active'), false);
        });
    });
    $('.toggle-nav').click(function () {
        var open = $('nav').hasClass('.open');

        $(this).attr("aria-expanded", !open).toggleClass('open');
        $('nav').attr("aria-expanded", !open).toggleClass('open');
    });

});

Snap.load('/beta/ZIP-BUG-WINGS.svg', function (bug) {
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
        timeout = animate ? 1000 : 0,
        scale = 0.08;

    $('section.active').removeClass('active');
    ele.addClass('active');

    $('a.active').removeClass('active');
    $('a' + '[data-id="' + ele[0].id + '"]').addClass('active');


    $('.scroll-body').addClass('scale-up').animate({
        scrollTop: $w_top,
        scrollLeft: $w_left,
    }, timeout, function () {
        $('.scroll-body').removeClass('scale-up');
    });
}