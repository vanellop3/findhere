import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import utilityReducer from "./utilityReducer";

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    utility:utilityReducer
});