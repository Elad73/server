const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
const requireLogin = require('../middlewares/requireLogin');
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients }  = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map( email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
    });

    //Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
        await mailer.send();

        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
    } catch(err){
        res.status(422).send(err); //unprocessable entity
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log("inside the webhook===============================================> ");
    const p = new Path('/api/surveys/:surveyId/:choice');
    console.log("req.body ===============================================> " + JSON.stringify(req.body));
    console.log("*********************************************** ISOLATING THE PROBLEM ******************************************");
    const eventsToMatch = _.chain(req.body)
        .map(({ url, email}) => {
                const match = p.test(new URL(url).pathname); //either will be an object (with a surveyId and a choice) or a null
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
        }).compact().uniqBy('email', 'surveyId');
    
    console.log("eventsToMatch ===============================================> " + JSON.stringify(eventsToMatch));
    console.log("*********************************************** ISOLATING THE PROBLEM ******************************************");
    const events = _.chain(req.body)
        .map(({ url, email}) => {
                const match = p.test(new URL(url).pathname); //either will be an object (with a surveyId and a choice) or a null
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
        }) 
        .compact() //return only events objects, removing all of the undefined
        .uniqBy('email', 'surveyId') //if there are any duplicants at the email or at the surveyId fields, then remove them
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
              {
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false }
                }
              },
              {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
              }
            ).exec();
          })
        .value();

        console.log("events after building the object to save ===============================================> " + JSON.stringify(events));
    res.send({});
  });
  
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    console.log("inside /api/surveys/:surveyId/:choice  ===============================================> " + JSON.stringify(req.body));
    res.send('Thanks for voting!');
  }); 
};
