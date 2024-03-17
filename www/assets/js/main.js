/* global gsap, $ */

// gsap.registerPlugin(ScrollTrigger);
// Might add it later ¯\_(ツ)_/¯

// const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)') === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;

const hamburger = $('#hamburger');
const navLi = $('.nav-li');
const customDetails = $('custom-details');

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
        const details = hamburger.parent();
        if (navOpening.isActive() || navClosing.isActive()) return;
        if (!details.prop('open')) {
            details.prop('open', true);
            details.addClass('opening');
            navOpen();
            setTimeout(() => details.removeClass('opening').addClass('opened'), navLi.length * 500);
            return;
        }

        details.removeClass('opened').addClass('closing');
        navClose();
        setTimeout(() => {
            details.prop('open', false);
            details.removeClass('closing');
        }, 670);
    });

    $('custom-summary').on('click', () => {
        toggleCustomDetails();
    });

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
        y: $('.line-1').position().top + hamburger.height() / 2 - 3,
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
        y: -1 * $('.line-3').position().top + hamburger.height() / 2 - 3,
        ease: 'circ.in'
    }, 0);

navLi.each(i => {
    navOpening.from('.nav-li-' + (i + 1), 1, {
        x: '150%',
        rotate: '-50deg',
        ease: 'circ.out',
    }, (i + 1) / navLi.length * 1.5);
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

navLi.each(i => {
    navClosing
        .to('.nav-li-' + (i + 1), .67, {
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
        setTimeout(() => toggleCustomDetails(true), navLi.length * 1.5);
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

    if (customDetails.attr('open') !== 'open' ||
    (force && forceOpenOrClose === 0)) {
        customDetails.attr('open', true);
        linksOpen();
    }
    else {
        linksClose();
        setTimeout(() => customDetails.attr('open', false), 1e3) ;
    }
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

window.addEventListener('pageshow', e => {
    const historyTraversal = e.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2); // TODO: performance.navigation is  deprecated

    if (historyTraversal) window.location.reload();
});
