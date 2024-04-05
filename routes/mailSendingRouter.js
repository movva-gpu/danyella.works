const createError = require('http-errors');
const express = require('express');
const { validate } = require('deep-email-validator');
const nodemailer = require('nodemailer');

const mailSendingRouter = express.Router();
const mailConfig = require('../conf/mail.json');
const { myMail } = require('../conf/misc.json');

const transporter = nodemailer.createTransport(mailConfig);

mailSendingRouter.get('*', (_req, _res, next) => {
    next(createError(400));
});

mailSendingRouter.post('/', (req, res) => {
    // 0 = Success ; 1 = EmailSyntax ; 2 = EmailTypo ; 3 = SmtpTimeout ; 4 = BadBody ; 5 = MessageNotSent ;
    let error = 0;
    let suggestion = '';
    
    let body = req.body;
    
    if (!body || !body.fname || !body.name || !body.email || !body.subject || !body.message) {
        error = 4;
    }

    let firstName = body.fname;
    let lastName = body.name;
    let email = body.email;
    let subject = body.subject;
    let message = body.message;

    validate(email).then(e => {
        switch (e.reason) {
        case 'regex':
            error = 1;
            break;
            
        case 'typo':
            error = 2;
            suggestion = e.validators.typo.reason.split(': ')[1];
            break;
        }
        
        if (error !== 0) {
            res.redirect('/?error=' + error.toString() + (suggestion ? ('&suggestion=' + suggestion) : '') + '#contact');
            return;
        }
        transporter.sendMail({
            from: `"${firstName} ${lastName}" <noreply@danyella.works>`,
            to: myMail,
            subject: subject,
            text: message
        }).then((info) => {
            console.log(info);
            if (info.accepted[0] !== myMail) {
                error = 5;
                res.redirect('/?error=' + error.toString() + '#contact');
                return;
            }
            transporter.sendMail({
                from: '"Danyella Strikann" <noreply@danyella.works>',
                to: email,
                subject: 'Mail de confirmation',
                text: 'Votre mail à bien été envoyé!'
            }).then((info) => {
                if (info.accepted[0] !== email) error = 5;

                res.redirect('/?error=' + error.toString() + '#contact');
            }).catch((err) => {
                error = 5;
                res.redirect('/?error=' + error.toString() + '#contact');
                console.log(err);                
            });
        }).catch((err) => {
            error = 5;
            res.redirect('/?error=' + error.toString() + '#contact');
            console.log(err);
        });
    });

});

module.exports = mailSendingRouter;
