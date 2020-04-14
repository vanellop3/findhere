import {ADD_UTILITY} from '../actions/types';

const initialState = {
    utility: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case ADD_UTILITY:
            return {
                ...state,
                utility: action.payload
            }
        default:
            return state;
    }
}