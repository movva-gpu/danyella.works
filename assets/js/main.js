// gsap.registerPlugin(ScrollTrigger);
// Might add it later ¯\_(ツ)_/¯

const controller = new ScrollMagic.Controller();
const scrambler = new window.Scrambler();

const handleScramble = (txt) => $('#info').html(txt);

const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
console.log(isReduced);

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

    let hideMMI = new gsap.timeline().to('.about-me .left .mmi', .3, { opacity: 0 }, 0); hideMMI.pause();
    new ScrollMagic.Scene({ // About me animations
        triggerElement: '.about-me',
        triggerHook: 1,
        duration: $('.about-me').outerHeight() + $('footer').outerHeight()
    }).setPin('.hero', {
        pushFollowers: false
    }).setTween(
        new gsap.timeline()
        .from('.left', .5, {
            x: '-100%',
            ease: 'circ.out',
            onComplete: () => { h2Enter(); crazyLeftText(); }
        }, .5)
        .from('.right', .5, {
            x: '100%',
            ease: 'circ.out',
            onComplete: () => { crazyRightText(); }
        }, 1.5)
        .to('.about-me', 1, {
            height: $('.about-me').outerHeight() + $('body').outerHeight() * .1,
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
            setTimeout(() => $('custom-details').attr('open', false), 1e3) ;
        }
}

const h2Entering = new gsap.timeline()
    .from('.about-me h2', 4, {
        rotateX: -95,
        ease: 'elastic.out(1, .3)',
        transformOrigin: 'center top',
    }, 0);
h2Entering.pause();

/**
 * Animates the text entering the screen.
 */
function h2Enter() {
    h2Entering.play();
}

const crazyLeftTextTl = new gsap.timeline();
let i = 0;
$('.about-me .left .rot').each(() => {
    crazyLeftTextTl.fromTo($('.about-me .left .rot')[i], 1,
    { rotateY: 360 },
    { y: -10, rotateY: 0, color: '#c7e', ease: 'slow(.3, .3, true)' }
    , .1 * i);
    i++;
})
crazyLeftTextTl
.to('.about-me .left .mmi', 0, { opacity: 1 }, i * .1)
.from('.about-me .left .mmi .m1', .7, {
    transformOrigin: 'left bottom',
    scale: 0,
    ease: 'circ.out'
}, i * .1 + .5)
.to('.about-me .left .mmi', .7, {
    transformOrigin: 'left bottom',
    scale: 1.2,
    y: 10,
    ease: 'circ.out',
}, i * .1 + 1)
.from('.about-me .left .mmi .m2', .7, {
    transformOrigin: 'left bottom',
    scale: 0,
    ease: 'circ.out'
}, i * .1 + 1.5)
.to('.about-me .left .mmi', .7, {
    transformOrigin: 'left bottom',
    scale: 1.4,
    y: 25,
    ease: 'circ.out',
}, i * .1 + 2)
.from('.about-me .left .mmi .i', .7, {
    transformOrigin: 'left bottom',
    scale: 0,
    ease: 'circ.out'
}, i * .1 + 2.5)
.to('.about-me .left .mmi', .7, {
    transformOrigin: 'left bottom',
    scale: 1.6,
    y: 40,
    ease: 'circ.out',
}, i * .1 + 3)
.from('.about-me .left .mmi .mark', 4, {
    rotateX: 270,
    ease: 'elastic.out'
})
.to('.about-me .left .mmi', 1, {
    scale: 1,
    y: 0,
    ease: 'elastic.out'
})
crazyLeftTextTl.pause();

function crazyLeftText() {
    if (crazyLeftTextTl.isActive() || crazyLeftTextTl.progress() == 1 || isReduced) return;
    crazyLeftTextTl.play(0);
}

const crazyRightTextTl = new gsap.timeline()
// #region Rotation
.from('.about-me .right .c', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, 0)
.from('.about-me .right .r', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .2)
.from('.about-me .right .é1', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .3)
.from('.about-me .right .a', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .4)
.from('.about-me .right .t1', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .5)
.from('.about-me .right .i1', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .6)
.from('.about-me .right .v', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .6)
.from('.about-me .right .i2', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .7)
.from('.about-me .right .t2', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .8)
.from('.about-me .right .é2', 3, {
    rotateX: 720,
    ease: 'expo.out'
}, .9)
// #endregion
// #region Color ↓
.to('.about-me .right .c', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, 0)
.to('.about-me .right .r', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .2)
.to('.about-me .right .é1', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .3)
.to('.about-me .right .a', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .4)
.to('.about-me .right .t1', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .5)
.to('.about-me .right .i1', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .6)
.to('.about-me .right .v', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .6)
.to('.about-me .right .i2', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .7)
.to('.about-me .right .t2', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .8)
.to('.about-me .right .é2', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .9);
// #endregion

crazyRightTextTl.pause();

function crazyRightText() {
    if (crazyRightTextTl.isActive() || crazyRightTextTl.progress() == 1 || isReduced) return;
    crazyRightTextTl.play(0);
    scrambler.scramble('\'informatique', handleScramble, {
        characters: [0, '1']
    });

    let i = 0;
    let TEXTS = [
        'u numérique',
        'e sciences',
        '\'informatique'
    ];
    let letters = [];
    setInterval(() => {
        if (i + 1 < TEXTS.length) {
            i++;
        } else {
            i = 0;
        }
        switch (i) {
            case 0:
                letters = Scrambler.CHARACTERS.ALPHABET;
                break;
            case 1:
                letters = Scrambler.CHARACTERS.DEFAULT;
                break;
            case 2:
                letters = [0, '1'];
                break;

            default:
                letters = Scrambler.CHARACTERS.ALPHABET;
                break;
        }

        scrambler.scramble(TEXTS[i], handleScramble, {
            characters: letters
        });
    }, 4e3);
}

if (isReduced) {
    $('.right #info').html('d\'informatique');
    crazyLeftTextTl.seek(crazyLeftTextTl.duration());
    crazyRightTextTl.seek(crazyRightTextTl.duration());
}