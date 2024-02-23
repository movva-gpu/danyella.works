const express = require('express');
const path = require('path');
const resumeRouter = express.Router();

resumeRouter.get('/', (req, res) => {
    res.sendFile('/' + path.relative('/', 'www/assets/pdf/cv.pdf'));
});

module.exports = resumeRouter;
