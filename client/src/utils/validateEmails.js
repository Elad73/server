const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => emailRegex.test(email) === false); //we want to keep around the invalid emails!

    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};