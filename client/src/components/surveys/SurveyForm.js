//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields(){
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field key={name} label={label} name={name} type="text" component={SurveyField} />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/dashboard" className="red btn-flat left white-text">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next (review)
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>    
        );
    }
}

function validate(values) {
    const errors = {}; 

    errors.recipients = validateEmails(values.recipients || ''); //if no emails have entered, then we will provide an empty string

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors; //if the errors are emtpy than reduxForm understands that the validation has passed
}

export default reduxForm({
    validate, //that function is automatically activated whenever the user submit the form
    form: 'surveyForm', //this property is of reduxForm
    destroyOnUnmount: false
})(SurveyForm);