const express = require('express');
const projectRouter = express.Router();

const domains = require('../conf/domains.json');

projectRouter.get('*', (req, res, next) => {
    const options = {
        hostname:
            req.hostname === 'localhost' ||
            req.hostname === '127.0.1' ?
                'localhost:8080' :
                req.hostname.split('.').length == 2 ?
                    req.hostname : req.hostname.split('.')[1] + '.' + req.hostname.split('.')[2],
        domains: domains
    };

    if (req.hostname.split('.')[0] !== domains.projects) { next(); return; }
    if (req.url == '/' || req.url == '') { res.render('projects', { title: 'Mes projets', ...options }); return; }
    if (req.url === '/cv' || req.url === '/resume') { next(); return; }
    if (req.url === '/projects') { res.redirect('/'); return; }
    res.redirect(`/projects${req.url}`);
});

module.exports = projectRouter;
