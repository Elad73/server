const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => emailRegex.test(email) === false); //we want to keep around the invalid emails!

    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};