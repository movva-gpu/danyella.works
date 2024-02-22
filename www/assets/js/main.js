// gsap.registerPlugin(ScrollTrigger);
// Might add it later ¯\_(ツ)_/¯

const controller = new ScrollMagic.Controller();
const scrambler = new window.Scrambler();

const handleScramble = (txt) => $('#info').html(txt);

const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

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

window.addEventListener('pageshow', e => {
    var historyTraversal = e.persisted || ( typeof window.performance != 'undefined' && window.performance.navigation.type === 2); // TODO: performance.navigation is  deprecated

    if (historyTraversal) window.location.reload();
})
