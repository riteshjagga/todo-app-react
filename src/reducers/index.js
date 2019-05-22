import { combineReducers} from 'redux';
import todosListReducer from './todosListReducer';

export default combineReducers({
    todosList: todosListReducer
});
