const express = require('express');
const router = express.Router();

const domains = require('../conf/domains.json');

router.get('/', (req, res, next) => {
    const options = {
        hostname:
            req.hostname === 'localhost' ||
            req.hostname === '127.0.1' ?
                'localhost:3000' :
                req.hostname.split('.').length == 2 ?
                    req.hostname : req.hostname.split('.')[1] + '.' + req.hostname.split('.')[2],
        domains: domains
    };

    switch (req.hostname.split('.')[0]) { // That piece of madness makes this work with any domain name, even localhost
        case domains.portfolio:
            res.render('portfolio', { title: 'Mon Portfolio', ...options })
            break;
        case domains.projects:
            res.render('projects', { title: 'Mes Projets', ...options })
            break;
        case domains.home ? domains.home : domains.domains :
        default:
            res.render('home', { title: 'Danyella Strikann', ...options })
            break;
    }
});

module.exports = router;
