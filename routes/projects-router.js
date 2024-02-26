const express = require('express');
const fs = require('fs');
const path = require('path');

const projectRouter = express.Router();

const domains = require('../conf/domains.json');
const createError = require('http-errors');

projectRouter.get('*', (req, res, next) => {
    if (req.hostname.split('.')[0] !== domains.projects) { next(); return; }
    if (req.url === '/' || req.url == '') { res.render('projects', { title: 'Mes projets', ...options }); return; }
    if (req.url === '/cv' || req.url === '/resume' || req.url.startsWith('/sae')) { next(); return; }
    if (req.url === '/projects') { res.redirect('.'); return; }
    if (fs.existsSync(path.join(__dirname, `../www/projects${req.url}`))) { res.redirect(`/projects${req.url}`); return; }
    next(createError(404));
});

module.exports = projectRouter;
