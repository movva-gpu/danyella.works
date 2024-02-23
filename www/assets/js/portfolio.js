/* global Scrambler, gsap, $, ScrollMagic, MotionPathPlugin */

gsap.registerPlugin(MotionPathPlugin);

const controller = new ScrollMagic.Controller();
const scrambler = new Scrambler();

$(() => {
    $('.port-hero').css('min-height', `${$(window).height() - $('header').outerHeight()}px`);

    $('main').on({
        mouseenter: handleTitleParallax,
        mousemove: handleTitleParallax,
        mouseleave: handleTitleLeave // Somehow doesn't work well
    }); // TODO: fix parallax

    $('.link, .dw').on('click', (e) => { // Transition on link click
        e.preventDefault();
        let link = $(e.target).prop('href') || $(e.target.parentElement).prop('href');
        let newTab = false;
        let newWindow = false;
        if (e.ctrlKey) {
            newTab = true;
        } else if (e.shiftKey) {
            newWindow = true;
        }
        transition(link, newTab, newWindow);
    });

    new ScrollMagic.Scene({ // Mes projets Mes projets Mes projets sliding
        triggerElement: '.port',
        triggerHook: 1,
        duration: '500%'
    }).setTween(
        new gsap.timeline()
            .fromTo('.port .h2-wrapper', {
                x: 0,
                duration: 2,
                ease: 'none'
            }, {
                x: '-500%',
                ease: 'none'
            }, 0)
    ).addTo(controller);

    new ScrollMagic.Scene({ // Title fading
        triggerElement: '.port',
        triggerHook: 0,
        duration: '50%'
    }).setTween(
        new gsap.timeline()
            .to('.port .h2-wrapper', {
                duration: 1,
                y: '-100%',
                opacity: 0
            }, 0)
    ).addTo(controller);

    new ScrollMagic.Scene({ // Validity image rotating in
        triggerElement: '.port',
        triggerHook: .5,
        duration: '125%'
    }).setTween(
        new gsap.timeline()
            .fromTo('.validity-wrapper img:not(.glow)', {
                opacity: 0,
                rotationX: 60,
                rotationY: 10,
                rotationZ: 80,
            }, {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                opacity: 1,
                duration: 1,
                ease: 'exp.out'
            }, 0)
            .fromTo('.validity-wrapper .glow', {
                opacity: 0,
                rotationX: 60,
                rotationY: 10,
                rotationZ: 80,
            }, {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                opacity: .4,
                duration: 1,
                ease: 'exp.out'
            }, 0)
            .from('.validity-wrapper h3', {
                duration: .1,
                onComplete: () => scrambler.scramble('Validity:RE', (txt) => $('.validity-wrapper h3').html(txt)),
                onReverseComplete: () => scrambler.scramble('', (txt) => $('.validity-wrapper h3').html(txt))
            }, .57)
    ).addTo(controller);

    let plurals = new gsap.timeline();

    $('.validity-wrapper pre span').each(i => {
        plurals
            .from('.plural-' + (i + 1), {
                motionPath: {
                    path: '#plural'
                },
                transformOrigin: '50% 50%',
                rotate: 0,
                duration: 1,
            }, i * .05);
    });

    new ScrollMagic.Scene({ // Text moving up
        triggerElement: '.port pre',
        triggerHook: .5,
        duration: '250%'
    }).setTween(plurals).addTo(controller);

    let rtdRatio = 1365 / 2048; // Ratio of the image

    new ScrollMagic.Scene({ // Image sliding in
        triggerElement: '.rtd-wrapper',
        triggerHook: 0,
        duration: '100%'
    }).setTween(
        new gsap.timeline()
            .to('.rtd', {
                duration: 1,
                width: $(window).height() * rtdRatio,
                ease: 'power4.out'
            }, 0)
    ).addTo(controller);

    new ScrollMagic.Scene({ // Pining the image
        triggerElement: '.rtd-wrapper',
        triggerHook: 0,
        duration: $('.rtd-wrapper').height()
    }).setPin('.rtd', { pushFollowers: false }).addTo(controller);

    let introWrapper = new gsap.timeline();

    $('.rtd-wrapper h3 span').each(i => {
        introWrapper
            .from('.intro-wrapper .span-' + (i + 1), {
                duration: .1,
                x: $('.intro-wrapper').width() + 100,
                ease: 'exp.out',
            }, i * .01);
    });

    introWrapper
        .from('.intro-wrapper small', {
            duration: .1,
            y: '100%',
            opacity: 0,
            ease: 'power4.out',
        }, .1)
        .from('.intro-wrapper p', {
            rotateY: -95,
            transformOrigin: 'top right',
            ease: 'circ.out',
            duration: 1
        }, .108)
        .to('.intro-wrapper .progress', {
            duration: 1,
            borderBottomLeftRadius: '1rem',
            width: $(window).width() - $(window).height() * rtdRatio,
            ease: 'none',
        }, 0)
        .to('.intro-wrapper .progress', {
            duration: .1,
            borderBottomLeftRadius: 0
        }, .9);

    new ScrollMagic.Scene({ // Description of the RTD fan-site
        triggerElement: '.intro-wrapper',
        triggerHook: .1,
        duration: '150%'
    }).setTween(introWrapper).setPin('.intro-wrapper', { pushFollowers: false }).addTo(controller);

    new ScrollMagic.Scene({ // Buttons rotating in and out
        triggerElement: '.btn-wrapper',
        triggerHook: 0,
        duration: '400%'
    }).setTween(
        new gsap.timeline()
            .to('.btn-wrapper .visit', {
                motionPath: {
                    path: '#btns',
                    start: .2,
                    end: .5,
                    offsetY: -200
                },
                display: 'block',
                duration: .5,
                transformOrigin: '50% 50%',
                ease: 'sine.out'
            }, 0)
            .to('.btn-wrapper .visit', {
                motionPath: {
                    path: '#btns',
                    start: .5,
                    end: 1,
                    offsetY: -200
                },
                duration: .5,
                transformOrigin: '50% 50%',
                ease: 'sine.in'
            }, .5)
            .to('.btn-wrapper .git', {
                motionPath: {
                    path: '#btns',
                    start: .2,
                    end: .5,
                    offsetY: -200
                },
                display: 'block',
                duration: .5,
                transformOrigin: '50% 50%',
                ease: 'sine.out'
            }, .5)
            .to('.btn-wrapper .git', {
                motionPath: {
                    path: '#btns',
                    start: .5,
                    end: 1,
                    offsetY: -200
                },
                display: 'block',
                duration: .5,
                transformOrigin: '50% 50%',
                ease: 'sine.in'
            }, 1)
            .from('.btn-wrapper .visit', {
                duration: .5,
                rotate: -45 * .8,
                ease: 'sine.out'
            }, 0)
            .from('.btn-wrapper .git', {
                duration: .5,
                rotate: -45 * .8,
                ease: 'sine.out'
            }, .5)
            .to('.btn-wrapper .visit', {
                duration: .5,
                rotate: 90,
                ease: 'sine.in'
            }, .5)
            .to('.btn-wrapper .git', {
                duration: .5,
                rotate: 90,
                ease: 'sine.in'
            }, 1)
            .to('.rtd', {
                duration: .5,
                width: 0
            }, .8)
    ).setPin('.btn-wrapper', { pushFollowers: false }).addTo(controller);
});

function handleTitleParallax(e) {
    let mouseX = e.clientX - $(window).width() / 2;
    let mouseY = e.clientY - $(window).height() / 2;

    gsap.to('h1 span', {
        y: mouseY * .1 + 'px',
        x: mouseX * .1 + 'px',
        ease: 'power4.out',
    });

    gsap.to('h1 svg', {
        y: mouseY * -.08 + 'px',
        x: mouseX * -.08 + 'px',
        ease: 'power4.out',
    });
}

function handleTitleLeave() {
    gsap.to('h1 span', {
        y: 0,
        x: 0,
        duration: 1,
        ease: 'circ.out',
    });

    gsap.to('h1 svg', {
        y: 0,
        x: 0,
        duration: 1,
        ease: 'circ.out',
    });
}

let pageTransitionner = new gsap.timeline()
    .from('.col-1', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, 0)
    .from('.col-2', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .05)
    .from('.col-3', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .11)
    .from('.col-4', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .17)
    .from('.col-5', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .23)
    .from('.col-6', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .29)
    .from('.col-7', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .35)
    .from('.col-8', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .41)
    .from('.col-9', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .47)
    .from('.col-10', {
        width: 0,
        ease: 'power4.out',
        duration: 1
    }, .53);

pageTransitionner.pause();

function transition(link, isInNewTab = false, isInNewWindow = false) {
    if (pageTransitionner.isActive()) return;
    pageTransitionner.play(0);
    setTimeout(() => open(link, isInNewTab || isInNewWindow ? '_blank' : '_self', isInNewWindow ? 'location:yes' : undefined), pageTransitionner.duration() * 1000);
    if (isInNewTab || isInNewWindow) setTimeout(() => pageTransitionner.reverse(0), pageTransitionner.duration() * 1000 + 100);
}
