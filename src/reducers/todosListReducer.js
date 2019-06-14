import TodoFilterEnum from '../enums/TodoFilterEnum';
import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
    SET_FILTER, SET_TODO_SEARCH_TEXT,
    UPDATE_TODO_STATUS_SUCCESS,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
    RESTORE_TODO_REQUEST, RESTORE_TODO_SUCCESS, RESTORE_TODO_FAILURE
} from '../actions/types';

export const INITIAL_STATE = {
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
        case FETCH_TODOS_SUCCESS: {
            const {todos, totalTodos, page} = action.payload;

            return {
                ...state,
                loading: false,
                todos: todos.map(todo => ({...todo/*, tag_ids: [...todo.tag_ids]*/, actionLoading: false})),
                totalTodos,
                page,
                totalPages: Math.ceil(totalTodos / state.itemsPerPage)
            };
        }
        case FETCH_TODOS_FAILURE: {
            return {...state, loading: false};
        }
        case UPDATE_TODO_STATUS_SUCCESS: {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id.$oid === action.payload.id) {
                        return {...todo, _status: action.payload.status};
                    }

                    return todo;
                })
            };
        }
        case DELETE_TODO_REQUEST:
        case RESTORE_TODO_REQUEST:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id.$oid === action.payload.id) {
                        return {...todo, actionLoading: true};
                    }

                    return todo;
                })
            };
        case DELETE_TODO_SUCCESS:
        case DELETE_TODO_FAILURE:
        case RESTORE_TODO_SUCCESS:
        case RESTORE_TODO_FAILURE: {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id.$oid === action.payload.id) {
                        return {...todo, actionLoading: false};
                    }

                    return todo;
                })
            };
        }
        case SET_FILTER: {
            return {...state, filter: action.payload};
        }
        case SET_TODO_SEARCH_TEXT: {
            return {...state, searchText: action.payload};
        }
        default: {
            return state;
        }
    }
};

export default todosListReducer;
