const express = require('express');
const router = express.Router();

const domains = require('../conf/domains.json');
const { IS_DEV } = require('../app.js');

router.get('/', (req, res) => {
    switch (req.hostname.split('.')[0]) { // That piece of madness makes this work with any domain name, even localhost
    case domains.portfolio:
        res.render('portfolio', { title: 'Mon Portfolio', isDev: IS_DEV });
        break;

    default:
        res.render('home', { title: 'Danyella Strikann', isDev: IS_DEV, error: Number.parseInt(req.query.error), suggestion: req.query.suggestion });
        break;
    }
});

module.exports = router;
