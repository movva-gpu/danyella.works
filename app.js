const createError = require('http-errors');
const express = require('express');
const path = require('path');

const router = require('./routes/router');
const resumeRouter = require('./routes/resume-router');

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

app.use('/', projectRouter);
app.use('/', router);
app.use(/\/(cv|resume)/, resumeRouter);

app.use((req, res, next) => {
    next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { hostname: req.hostname.split('.').length == 2 ? req.hostname : req.hostname.split('.')[1] + req.hostname.split('.')[2], domains: domains });
});

app.listen(8081, () => {
    console.log('Server started on port 8080');
});
