//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
    render() {
        return (
            <div>
                <h3>
                    SurveyForm!
                </h3>
            </div>    
        );
    }
}

export default reduxForm({
    form: 'surveyForm' //this property is of reduxForm
})(SurveyForm);