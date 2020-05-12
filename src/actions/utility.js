import axios from 'axios';
import {GET_ERRORS} from "./types";

export const addUtility = (utility, history) => dispatch => {
    axios.post('http://localhost:4000/utility/create-utility', utility)
        .then(res => history.push('/utility-list'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}



// export const getMyUtility = (userId) => dispatch => {
//     axios.get('http://localhost:4000/utility')
//         .then(res =>
//             // console.log(res.data.filter(utility=>utility.creatorId === userId)))
//             res.data.filter(utility=>utility.creatorId === userId))
//         .catch(err => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             });
//         });
// }