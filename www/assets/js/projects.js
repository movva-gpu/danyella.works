/* global gsap, $, */

$(() => {
    new gsap.timeline()
        .from('.arrow-down', {
            duration: 3,
            y: '200%',
            ease: 'elastic.out(.5, .25)'
        }, 0);
});