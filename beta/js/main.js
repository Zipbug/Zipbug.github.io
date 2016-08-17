$(document).ready(function () {
    scrollToElement($("#main"));
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3000);

    $('nav a').click(function () {
        var t_id = $(this).data('id'),
            target = $("#" + t_id);
        scrollToElement(target);
    });


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
    console.log(l_wing);
    l_wing.animate({
        transform: 'r120,340,400.5',
    }, 200, mina.linear);
    r_wing.animate({
        transform: 'r-120,640,400.5',
    }, 200, mina.linear);
}

function scrollToElement(ele) {
    var $w_top = $('.scroll-body').scrollTop() + ele.offset().top,
        $w_left = $('.scroll-body').scrollLeft() + ele.offset().left;

    $('.scroll-body').animate({
        scrollTop: $w_top,
        scrollLeft: $w_left
    }, 1000);
}