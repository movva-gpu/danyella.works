const express = require('express');
const path = require('path');
const projectRouter = express.Router();

const domains = require('../conf/domains.json');

projectRouter.get('/:folderName', (req, res, next) => {
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
    const folderName = req.params.folderName;
    if (!req.params.folderName) { res.render('projects', { title: 'Mes projets', ...options }); return; }
    if (req.params.folderName === 'cv') { next(); return; }
    res.sendFile(path.join(__dirname, `../www/projects/${folderName}/index.html`));
});

module.exports = projectRouter;
