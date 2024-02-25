const express = require('express');
const path = require('path');
const projectRouter = express.Router();

const domains = require('../conf/domains.json');

projectRouter.get('/:folderName', (req, res, next) => {
    if (req.hostname.split('.')[0] !== domains.projects) { next(); return; }
    const folderName = req.params.folderName;
    res.sendFile(path.join(__dirname, `../www/projects/${folderName}/index.html`));
});

module.exports = projectRouter;
