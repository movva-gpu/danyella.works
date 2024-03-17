const express = require('express');
const path = require('path');
const pdfRouter = express.Router();

pdfRouter.get('*', (req, res) => {
    if (req.url.includes('cv') || req.url.includes('resume')) res.sendFile('/' + path.relative('/', 'www/assets/pdf/cv.pdf'));
    if (req.url.includes('sae101')) res.sendFile('/' + path.relative('/', 'www/assets/pdf/sae101.pdf'));
    if (req.url.includes('sae102')) res.sendFile('/' + path.relative('/', 'www/assets/pdf/sae102.pdf'));
    if (req.url.includes('sae103')) res.sendFile('/' + path.relative('/', 'www/assets/pdf/sae103.pdf'));
});

module.exports = pdfRouter;
