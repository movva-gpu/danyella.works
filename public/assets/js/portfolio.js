const controller = new ScrollMagic.Controller();

$(() => {
    $('.port-hero').css('min-height', `${$(window).height() - $('header').outerHeight()}px`);

    $(window).on({
        mouseenter: handleTitleParallax,
        mousemove: handleTitleParallax,
        mouseover: handleTitleParallax
    });

    new ScrollMagic.Scene({
        triggerElement: '.port',
        triggerHook: 1,
        duration: '100%'
    }).setTween(
        new gsap.timeline()
        .fromTo('.port h2', {
            x: '200%',
            duration: 2,
            ease: 'none'
        }, {
            x: '-200%',
            ease: 'none'
        }, 0)
    ).addIndicators().addTo(controller);

});

function handleTitleParallax(e) {
    mouseX = e.clientX - $(window).width() / 2;
    mouseY = e.clientY - $(window).height() / 2;

    gsap.to('h1 span', {
        y: mouseY * .1 + 'px',
        x: mouseX * .1 + 'px',
        ease: 'circ.out',
    });

    gsap.to('h1 svg', {
        y: mouseY * -.1 + 'px',
        x: mouseX * -.1 + 'px',
        ease: 'circ.out',
    });
}
