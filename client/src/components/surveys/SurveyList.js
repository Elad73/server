import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions' ;

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        
        return this.props.surveys.map(survey => {
            console.log(survey.dateSent);
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            
                            Send On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes {survey.yes}</a>
                        <a>No {survey.yes}</a>
                    </div>
                </div>
            );
        });
    }


    render() {
        return (
           <div>
               {this.renderSurveys()}
           </div> 
        );    
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

