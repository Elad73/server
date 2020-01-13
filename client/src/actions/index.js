import axios from 'axios';
import { FETCH_USER } from './types';

//disptach an action after a success call to current_user
export const  fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch( {type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch( {type: FETCH_USER, payload: res.data });

};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/dashboard'); //after the request has been over, redirect to the "dashboard" page.
    dispatch( {type: FETCH_USER, payload: res.data });
};