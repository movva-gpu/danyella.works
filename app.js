const createError = require('http-errors');
const express = require('express');
const path = require('path');

let arg2 = process.argv[2] || 'dev';
let IS_DEV;

switch (arg2) {

case 'prod':
    IS_DEV = false;
    break;

case 'dev':
default:
    IS_DEV = true;
    break;
}

module.exports.IS_DEV = IS_DEV;

const router = require('./routes/router');
const mailSendingRouter = require('./routes/mailSendingRouter');
const pdfRouter = require('./routes/pdf-router');

const auth = require('./auth');
const domains = require('./conf/domains.json');
const projectRouter = require('./routes/projects-router');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'www')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));

app.use('/private', (req, res, next) => auth(req, res, next, app));

app.use('/sending', mailSendingRouter);
app.use('/', projectRouter);
app.use('/', router);
app.use('/', pdfRouter);

app.use((_req, _res, next) => {
    next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error',
        {
            hostname: req.hostname.split('.').length === 2 ?
                req.hostname :
                req.hostname.split('.')[1] + req.hostname.split('.')[2],
            domains: domains,
            isDev: IS_DEV,
        }
    );
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
