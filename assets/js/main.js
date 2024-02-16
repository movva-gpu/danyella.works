// gsap.registerPlugin(ScrollTrigger);
// Might add it later ¯\_(ツ)_/¯

$(() => {

    console.log(
        '%c❤️ Hésitez pas à me contacter pour report le moindre bug ! ❤️\r\n🦆 Et bonne navigation ! 🦆',
        [
            'fontsize: 16px',
            'color: #edf',
            'display: inline-block',
            'background-color: #203',
            'border: 1px solid #edf',
            'text-family: monospace',
            'padding: 2em',
            'margin: 2em',
            'line-height: 3em',
            'border-radius: 1em',
            'text-align: center',
            'width: calc(100% - 2em * 2)',
        ].join(';'));

    const controller = new ScrollMagic.Controller();

    new gsap.timeline()
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
        toggleCustomDetails()
    });

    new ScrollMagic.Scene({ // Parallax scrolling
        triggerElement: '.hero',
        triggerHook: 0,
        duration: $(window).height() / 2
    }).setTween(new gsap.timeline()
    .to('.hero .background', 1, {
        backgroundPositionY: 18,
        ease: 'none'
    }, 0)
    .to('.hero .avatar', 1, {
        backgroundPositionY: 12,
        ease: 'none.out'
    }, 0)
    .to('.hero-text', 1, {
        y: 150,
        ease: 'none'
    }, 0)
    .to('.rubber-duckie', .5, {
        y: '33%',
        x: '33%',
        ease: 'circ.out'
    }, .5)
    .to('.bubble-bubble', 0, {
        display: 'block',
    }, .5)
    .from('.bubble-bubble', .5, {
        x: '200%',
        ease: 'circ.out'
    }, .5)).setPin('.hero')
    .addTo(controller);

    new ScrollMagic.Scene({ // About me animations
        triggerElement: '.about-me',
        triggerHook: 1,
        duration: $('.about-me').outerHeight() + $('footer').outerHeight()
    }).setPin('.hero', {
        pushFollowers: false
    }).setTween(
        new gsap.timeline()
        .from('.left', 1, {
            x: '-100%',
            ease: 'circ.out',
            onCompleteOnce: h2Enter
        }, 1)
        .from('.right', 1, {
            x: '100%',
            ease: 'circ.out'
        }, 1.1)
        .to('.about-me', 1, {
            height: $('.about-me').outerHeight() + $('body').outerHeight() * 0.1,
            ease: 'circ.out',
            transformOrigin: 'center top'
        }, .75)
        .to('.hero', 1, {
            opacity: 0,
            ease: 'none'
        }, 1)
    ).addTo(controller);

    new ScrollMagic.Scene({ // Footer animation
        triggerElement: 'footer',
        triggerHook: 1,
        duration: $('footer').outerHeight()
    }).setTween(new gsap.timeline()
    .from('footer p', .3, {
        opacity: 0,
        ease: 'none'
    }, .7)
    ).addTo(controller);
});

const navOpening = new gsap.timeline()
    .from('.contact', 1, {
        x: '-150%',
        rotate: '25deg',
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
            rotate: '-50deg',
            ease: 'circ.out',
        }, (i + 1) / $('.nav-li').length * 1.5);
});
navOpening.pause();

const navClosing = new gsap.timeline()
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

/**
 * Opens the nav
 */
function navOpen() {
    if (!navOpening.isActive() && !navClosing.isActive()) {
        navOpening.play(0);
        setTimeout(() => toggleCustomDetails(true), $('.nav-li').length * 1.5);
    }
}

/**
 * Closes the nav
 */
function navClose() {
    if (!navOpening.isActive() && !navClosing.isActive()) {
        navClosing.play(0);
        setTimeout(() => toggleCustomDetails(true, 1), 0);
    }
}

const linksOpening = new gsap.timeline()
    .from('custom-details a', 1, {
        y: '100%',
        opacity: 0,
        ease: 'back.out'
    }, 0);
linksOpening.pause();

const linksClosing = new gsap.timeline()
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

/**
 * Opens the links details
 */
function linksOpen() {
    if (!linksOpening.isActive() && !linksClosing.isActive()) {
        linksOpening.play(0);
    }
}

/**
 * Closes the links details
 */
function linksClose() {
    if (!linksOpening.isActive() && !linksClosing.isActive()) {
        linksClosing.play(0);
    }
}

/**
 * Toggles the visibility of the custom details section.
 * @param { boolean } [ force = false ] - If true, forces the custom details section to open or close, regardless of its current state.
 * @param { number } [ forceOpenOrClose = 0 ] - If force is true, specifies whether to open or close the custom details section. 0 is force open, 1 is force close
 */
function toggleCustomDetails(force = false, forceOpenOrClose = 0) {
    if ((linksOpening.isActive() && linksClosing.isActive() && !force)) return;
        if ($('custom-details').attr('open') !== 'open' ||
        (force && forceOpenOrClose == 0)) {
            $('custom-details').attr('open', true);
            linksOpen();
        }
        else {
            linksClose();
            setTimeout(() => $('custom-details').attr('open', false), 1000) ;
        }
}

const h2Entering = new gsap.timeline()
    .from('.about-me h2', 4, {
        rotateX: -90,
        ease: 'elastic.out(1, 0.3)',
        transformOrigin: 'center top',
    }, 1);
h2Entering.pause();

/**
 * Animates the text entering the screen.
 */
function h2Enter() {
    h2Entering.play(0);
}
