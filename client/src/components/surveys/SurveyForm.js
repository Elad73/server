//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
    {label:'Survey Title', name: 'title'},
    {label:'Subject Line', name: 'subject'},
    {label:'Email Body', name: 'body'},
    {label:'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {
    renderFields(){
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field key={name} label={label} name={name} type="text" component={SurveyField} />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
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
        if(!values.title) {
            errors.title = 'You must provide a title';
        }
  
    return errors; //if the errors are emtpy than reduxForm understands that the validation has passed
}

export default reduxForm({
    validate, //that function is automatically activated whenever the user submit the form
    form: 'surveyForm' //this property is of reduxForm
})(SurveyForm);