//SurveyFormReview shows users their form inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

//   function renderFields(){
//         return _.map(FIELDS, ({ label, name }) => {
//             return (
//                 <div key={name} label={label} name={name} type="text"  />
//             );
//         });
//     }

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = _.map(formFields, ({ name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>            

        );
    });

   
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow white-text darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
            <button 
                onClick={() => submitSurvey(formValues)}
                className="green btn-flat right white-text"

            >
                Send Survey For Review
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);