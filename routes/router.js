const express = require('express');
const router = express.Router();

const domains = require('../conf/domains.json');

router.get('/', (req, res, next) => {
    switch (req.hostname.split('.')[0]) { // That piece of madness makes this work with any domain name, even localhost
        case domains.portfolio:
            res.render('portfolio', { title: 'Mon Portfolio', hostname: req.hostname, domains: domains })
            break;
        case domains.projects:
            res.render('projects', { title: 'Mes Projets', hostname: req.hostname, domains: domains })
            break;
        case domains.home ? domains.home : domains.domains :
        default:
            res.render('home', { title: 'Danyella Strikann', hostname: req.hostname, domains: domains })
            break;
    }
});

module.exports = router;
