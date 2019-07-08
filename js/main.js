$(document).ready(function () {
    // Add Event Handlers
    $('nav a').on('click', onNavClick.bind(this));
    $('.toggle-nav').on('click', onNavToggle.bind(this));
    $("#contact-form").on('submit', onContactSubmit.bind(this));
    $("#contact-form input, #contact-form textarea").on('keyup', onKeyUp.bind(this))
    $(window).on('resize', onWindowResize.bind(this));

    //Check url hash to change positions, otherwise default to home.
    var lastLocation = window.location.hash ? window.location.hash : "#main";
    scrollToElement($(lastLocation), false);
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3000);

});

/*
    Event reactions
*/

function onNavClick(eventObj) {
    eventObj.preventDefault();
    var animating = $('.scroll-body').is(':animated')
    if(!animating){
        var t_id = $(eventObj.currentTarget).data('id'),
            target = $("#" + t_id);
        $('.scroll-body').stop();

        scrollToElement(target, true);
        window.location = "#" + t_id;
    }
}

function onWindowResize() {
    $('.scroll-body').stop();
    setTimeout(function () {
        scrollToElement($('section.active'), false);
    });
}

function onNavToggle() {
    var open = $('nav').hasClass('.open');

    $(this).attr("aria-expanded", !open).toggleClass('open');
    $('nav').attr("aria-expanded", !open).toggleClass('open');
}

function onKeyUp(eventObj){
    var target = $(eventObj.currentTarget);
    var value = target.val();
    if(value){
        target.next('label').addClass('filled');
    }else if(!value){
        target.next('label').removeClass('filled');
    }
}

function onContactSubmit() {
    var errors = 0;
    var submited = false;
    $('.r_input').each(function () {
        if (!$(this).next('label').hasClass('filled')) {
            $(this).addClass('warning').next('label').addClass('warning');
            errors++;
        } else{
            $(this).removeClass('warning').next('.warning').removeClass('warning');
        }
    });
    if (errors > 0) {
        $('.response').text("The red feilds are required");
        return false;
    } else if(!submited) {
        var form = $("#contact-form");
        form.addClass('collapsed');
        $('.warning').removeClass('warning');
        $.ajax({
            dataType: 'jsonp',
            url: "https://getsimpleform.com/messages/ajax?form_api_token=736387eef38da6ef6867f9638055e07b",
            data: $('#contact-form').serialize(),
            success: function () {
                submited = true;
                $('input, textarea').val("").removeClass('filled').next('label').removeClass('.filled');
                setTimeout(function(){
                    form.addClass('success submited');
                }, 800);
                setTimeout(function(){
                    form.removeClass('success');
                }, 1600);
                 setTimeout(function(){
                    form.removeClass('collapsed submited');
                }, 2100);
            },
            error: function () {
                submited = true;
                setTimeout(function(){
                    form.removeClass('collapsed');
                    $('.response').text("Sorry but we were unable to proccess your submition. Please try again later");
                }, 600);
            }
          });
        return false; //to stop the form from submitting
    }
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

/*
    Called on load to inject SVG file and anmiate
*/

Snap.load('ZIP-BUG-WINGS.svg', function (bug) {
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
