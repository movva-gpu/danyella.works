const createError = require('http-errors');
const auth = require('basic-auth');

const { username, password } = require('./www/private/user.json');
const domains = require('./conf/domains.json');

module.exports = (req, res, next) => {
    const user = auth(req);
    if (!user || user.name !== username || atob(password) !== user.pass) {
        res.set('WWW-Authenticate', 'Basic realm="Ceci est un dossier privé. Veuillez vous connecter."');
        return next(createError(401));
    }
    res.render('private', { title: 'Privé', hostname: req.hostname.split('.').length === 2 ? req.hostname : req.hostname.split('.')[1] + req.hostname.split('.')[2], domains: domains });
};
