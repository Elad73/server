const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        console.log("keys.sendGridKey before adding it to densgrid function ---------------------------------------------->" + JSON.stringify(keys.sendGridKey));
        //sendgrid specific setup
        this.sgApi = sendgrid(keys.sendGridKey);
        console.log("this.sgApi---------------------------------------------->" + JSON.stringify(this.sgApi));
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); //array of formated emails of the recipients

        this.addContent(this.body); //this is build-in function from helper.Mail
        console.log("After this.addContent---------------------------------------------->");
        this.addClickTracking();
        console.log("After this.addClickTracking---------------------------------------------->");
        this.addRecipients();
        console.log("After this.addRecipients---------------------------------------------->");
    }

    formatAddresses(recipients){
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        console.log("Inside send making the post request---------------------------------------------->");
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        console.log("After response ---------------------------------------------->" + JSON.stringify(response));
        return response;
    }
}

module.exports = Mailer;