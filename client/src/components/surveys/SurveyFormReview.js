//SurveyFormReview shows users their form inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import FIELDS from './formFields';

//   function renderFields(){
//         return _.map(FIELDS, ({ label, name }) => {
//             return (
//                 <div key={name} label={label} name={name} type="text"  />
//             );
//         });
//     }

const SurveyFormReview = ({ onCancel, formValues }) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);