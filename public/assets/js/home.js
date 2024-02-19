const controller = new ScrollMagic.Controller();
const scrambler = new window.Scrambler();

const handleScramble = (txt) => $('#info').html(txt);

const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)') === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
var isPhone = window.matchMedia('(width <= 600px)').matches

$(window).on('resize', () => {
    isPhone = window.matchMedia('(width <= 600px)').matches
});

$(() => {
    if (!isReduced) new gsap.timeline()
        .from('header', 1, {
            y: '-133%',
            ease: 'circ.out'
        }, 0).from('.hero-text', 1, {
            x: $(window).width() - $('.hero-text').innerWidth() / 2 + 33,
            ease: 'circ.out'
        }, 0);

        if (!isReduced) new ScrollMagic.Scene({ // Parallax scrolling
            triggerElement: '.hero',
            triggerHook: 0,
            duration: $(window).height() / 2
            }).setTween(new gsap.timeline()
            .to('.hero .background', 1, {
                backgroundPositionY: 18,
                ease: 'none'
            }, 0)
            .to('.hero .avatar', 1, {
                backgroundPositionY: () => { if (isPhone) return 11; else return 12; },
                ease: 'none.out'
            }, 0)
            .to('.hero-text', 1, {
                y: () => { if (isPhone) return 10; else return 350; },
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

        if (!isReduced) new ScrollMagic.Scene({ // About me animations
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
            .from('.right', .6, {
                x: '150%',
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

        if (!isReduced) new ScrollMagic.Scene({ // Footer animation
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
.from('.about-me .right .e1', 3, {
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
.from('.about-me .right .e2', 3, {
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
.to('.about-me .right .e1', 1.5, {
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
.to('.about-me .right .e2', 1.5, {
    color: '#c7e',
    ease: 'slow(.1,.1,true)'
}, .9);
// #endregion

crazyRightTextTl.pause();

function crazyRightText() {
    if (crazyRightTextTl.isActive() || crazyRightTextTl.progress() == 1 || isReduced) return;
    crazyRightTextTl.play(0);
    scrambler.scramble('d\'informatique,', handleScramble, {
        characters: [0, '1']
    });

    let i = 0;
    let TEXTS = [
        'd\'informatique',
        'du numérique',
        'de sciences'
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
                letters = [0, '1'];
                break;
            case 1:
                letters = Scrambler.CHARACTERS.ALPHABET;
                break;
            case 2:
                letters = Scrambler.CHARACTERS.DEFAULT;
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
