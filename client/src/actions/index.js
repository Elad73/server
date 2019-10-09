import axios from 'axios';
import { FETCH_USER } from './types';

//disptach an action after a success call to current_user
const fetchUser = () => {
    return function(dispatch) {
        axios.get('/api/current_user')
            .then(res => dispatch( {type: FETCH_USER, payload: res}));
    }

};
