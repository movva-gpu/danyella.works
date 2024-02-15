gsap.registerPlugin(ScrollTrigger);

$(document).ready(() => {

    // const controller = new ScrollMagic.Controller();

    new TimelineMax()
        .from('header', 1, {
            y: '-133%',
            ease: 'circ.out'
        }, 0).from('.hero-text', 1, {
            x: $(window).width() - $('.hero-text').innerWidth() / 2 + 33,
            ease: 'circ.out'
        }, 0);


    $('#hamburger').on('click', (e) => {
        e.preventDefault();
        if (navOpening.isActive() || navClosing.isActive()) return;
        if (!$('#hamburger').parent().prop('open')) {
            $('#hamburger').parent().prop('open', true);
            $('#hamburger').parent().addClass('opening');
            navOpen();
            setTimeout(() => $('#hamburger').parent().removeClass('opening').addClass('opened'), $('.nav-li').length * 500);
            return;
        }

        $('#hamburger').parent().removeClass('opened').addClass('closing');
        navClose();
        setTimeout(() => {
            $('#hamburger').parent().prop('open', false);
            $('#hamburger').parent().removeClass('closing');
    }, 670)
    });

    $('custom-summary').on('click', () => {
        if (linksOpening.isActive() && linksClosing.isActive()) return;
        if ($('custom-details').attr('open') !== 'open') {
            $('custom-details').attr('open', true);
            linksOpen();
        }
        else {
            linksClose();
            setTimeout(() => $('custom-details').attr('open', false), 1000) ;
        }
    });

    // new ScrollMagic.Scene({
    //     triggerElement: '.hero',
    //     triggerHook: 0,
    //     duration: $(window).height() / 2
    // }).setPin('.hero').addIndicators().addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: '.hero',
    //     triggerHook: 0,
    //     duration: $(window).height() * 1.5
    // }).setTween(
    //     new TimelineMax({ ease: 'none' })
    //         .to('.avatar', 1, {
    //             y: -150,
    //             ease: 'none'
    //         }, 0)
    //         .to('.hero-text', 1, {
    //             y: 350,
    //             ease: 'none'
    //         }, 0)
    //         .to('.hero .background', 1, {
    //             backgroundPositionY: 60,
    //             ease: 'none'
    //         }, 0)
    //         .to('.hero .rubber-duckie', .1, {
    //             y: '33%',
    //             x: '33%',
    //             ease: 'circ.out'
    //         }, .31)
    //         .from('.hero .bubble-bubble', .1, {
    //             x: '200%',
    //             ease: 'circ.out'
    //         }, .4)
    // ).addIndicators().addTo(controller)

    let heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            pin: true,
            start: 'top top',
            end: '+=' + $('.hero').height() ,
            scrub: 1,
            toggleActions: 'play none restart none'
        }
    })
    .to('.hero .background', 1, {
        backgroundPositionY: 25,
        ease: 'none'
    }, 0)
    .to('.hero .avatar', 1, {
        backgroundPositionY: 9,
        ease: 'exp.out'
    }, 0)
    .to('.hero-text', 1, {
        y: 150,
        ease: 'none'
    }, 0)
    .to('.rubber-duckie', 1, {
        y: '33%',
        x: '33%',
        ease: 'circ.out'
    }, .5)
    .from('.bubble-bubble', 1, {
        x: '200%',
        ease: 'circ.out'
    }, .5);

    let aboutMeTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-me',
            start: 'top bottom',
            toggleActions: 'play none restart none',
            scrub: true,
            end: '+=' + $('.about-me').height() / 2,
        }
    })
    .to('main', 2, {
        y: '-50%',
        ease: 'exp.out'
    });

    $(window).on('scroll', () => {
        if ($(window).scrollTop() >= $('main').position().top - $('.background').height() - 1) {
            $('.background').css({
                backdropFilter: 'unset',
                backgroundColor: 'white',
                transition: 'all ease 333ms'
            });
            return;
        }

        $('.background').css({
            backdropFilter: '',
            backgroundColor: ''
        });
    });
});

const navOpening = new TimelineMax()
    .from('.contact', 1, {
        x: '-150%',
        ease: 'circ.out',
    }, .5)
    .to('header .background', 1, {
        height: $(window).height(),
        ease: 'power2.out'
    }, 0)
    .to('.line-1', .3, {
        rotate: '45deg',
        y: $('.line-1').position().top + $('#hamburger').height() / 2 - 3,
        ease: 'circ.in'
    }, 0)
    .to('.line-2', .3, {
        x: -100,
        ease: 'circ.in'
    }, 0)
    .to('.line-2', 0, {
        opacity: 0
    }, 1)
    .to('.line-3', .3, {
        rotate: '-45deg',
        y: -1 * $('.line-3').position().top + $('#hamburger').height() / 2 - 3,
        ease: 'circ.in'
    }, 0);
$('.nav-li').each(i => {
    navOpening.from('.nav-li-' + (i + 1), 1, {
            x: '150%',
            rotate: '-5deg',
            ease: 'circ.out',
        }, (i + 1) / $('.nav-li').length * 1.5);
});
navOpening.pause();

const navClosing = new TimelineMax()
    .to('.contact', .67, {
        x: '-150%',
        ease: 'circ.in',
    }, 0)
    .to('header .background', 1, {
        height: 'calc(32px + 6em)',
        ease: 'power2.inOut'
    }, .33)
    .to('.line-1', .3, {
        rotate: 0,
        y: 0,
        ease: 'circ.out'
    }, 0)
    .to('.line-2', .3, {
        x: 0,
        opacity: 1,
        ease: 'circ.out'
    }, 0)
    .to('.line-3', .3, {
        rotate: 0,
        y: 0,
        ease: 'circ.out'
    }, 0);
$('.nav-li').each(i => {
    navClosing.to('.nav-li-' + (i + 1), .67, {
            x: '150%',
            ease: 'circ.in',
        }, 0)
        .to('.nav-li-' + (i + 1), 0, {
            rotate: '5deg',
        });
});
navClosing.pause();

function navOpen() {
    if (!navOpening.isActive() && !navClosing.isActive()) {
        navOpening.play(0);
    }
}

function navClose() {
    if (!navOpening.isActive() && !navClosing.isActive()) {
        navClosing.play(0);
    }
}

const linksOpening = new TimelineMax()
    .from('custom-details a', 1, {
        y: '100%',
        opacity: 0,
        ease: 'back.out'
    }, 0);
linksOpening.pause();

const linksClosing = new TimelineMax()
    .to('custom-details a', 1, {
        y: '100%',
        ease: 'exp.out'
    }, 0)
    .to('custom-details a', 1, {
        opacity: 0,
        ease: 'none'
    }, 0)
    .to('custom-details a', 0, {
        y: 0,
        opacity: 1
    }, 1.1);
linksClosing.pause();

function linksOpen() {
    if (!linksOpening.isActive() && !linksClosing.isActive()) {
        linksOpening.play(0);
    }
}

function linksClose() {
    if (!linksOpening.isActive() && !linksClosing.isActive()) {
        linksClosing.play(0);
    }
}
