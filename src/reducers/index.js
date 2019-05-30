import { combineReducers} from 'redux';
import todosListReducer from './todosListReducer';
import createTodoReducer from './createTodoReducer';
import tagsListReducer from './tagsListReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    todosList: todosListReducer,
    createTodo: createTodoReducer,
    tagsList: tagsListReducer,
    form: formReducer
});
