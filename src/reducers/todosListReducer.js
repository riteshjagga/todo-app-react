import TodoFilterEnum from '../enums/TodoFilterEnum';
import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    SET_FILTER,
    SET_SEARCH_TEXT,
    UPDATE_TODO_STATUS
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    todos: [],
    totalTodos: 0,
    page: 1,
    totalPages: 0,
    itemsPerPage: 10,
    filter: TodoFilterEnum.ACTIVE,
    searchText: ''
};

const todosListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_TODOS_REQUEST:
            return {...state, loading: true};
        case FETCH_TODOS_SUCCESS:
            const {todos, count: totalTodos} = action.payload.data;
            const {page} = action.payload;
            const totalPages = Math.ceil(totalTodos / state.itemsPerPage);
            return {...state, loading: false, todos, totalTodos, page, totalPages};
        case FETCH_TODOS_FAILURE:
            return {...state, loading: false};

        case UPDATE_TODO_STATUS:
            const updatedTodos = state.todos.map(todoItem => {
                if(todoItem._id.$oid === action.payload.id) {
                    todoItem._status = action.payload.status;
                }

                return todoItem;
            });

            return {...state, todos: updatedTodos};

        case SET_FILTER:
            return {...state, filter: action.payload};

        case SET_SEARCH_TEXT:
            return {...state, searchText: action.payload};

        default:
            return state;
    }
};

export default todosListReducer;
