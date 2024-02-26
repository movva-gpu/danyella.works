const express = require('express');
const router = express.Router();

const domains = require('../conf/domains.json');

router.get('/', (req, res) => {
    switch (req.hostname.split('.')[0]) { // That piece of madness makes this work with any domain name, even localhost
    case domains.portfolio:
        res.render('portfolio', { title: 'Mon Portfolio', ...options });
        break;

    default:
        res.render('home', { title: 'Danyella Strikann', ...options });
        break;
    }
});

module.exports = router;
