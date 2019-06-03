import { combineReducers} from 'redux';
import todosListReducer from './todosListReducer';
import upsertTodoReducer from './upsertTodoReducer';
import tagsListReducer from './tagsListReducer';
import upsertTagReducer from './upsertTagReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    todosList: todosListReducer,
    upsertTodo: upsertTodoReducer,
    tagsList: tagsListReducer,
    upsertTag: upsertTagReducer,
    form: formReducer
});
