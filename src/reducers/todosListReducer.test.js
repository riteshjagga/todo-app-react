import {INITIAL_STATE} from './todosListReducer';
import todosListReducer from './todosListReducer';
import * as types from '../actions/types';
import TodoFilterEnum from '../enums/TodoFilterEnum';
import {UPDATE_TODO_STATUS_SUCCESS} from "../actions/types";

describe('Todos List Reducer', () => {

    it('handles action with unknown type', () => {
        expect(todosListReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handles action with type FETCH_TODOS_REQUEST', () => {
        const action = { type: types.FETCH_TODOS_REQUEST};

        expect(todosListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: true});
    });

    it('handles action with type FETCH_TODOS_SUCCESS', () => {
        const page = 1;
        const todos = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            todos.push({id: index, title: `Todo Title ${index}`});
        }
        const totalTodos = 25;

        const action = { type: types.FETCH_TODOS_SUCCESS, payload: {page, todos, totalTodos} };

        const mappedTodos = todos.map(todo => ({...todo, actionLoading: false}));
        expect(todosListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false, page, todos: mappedTodos, totalTodos, totalPages: 3});
    });

    it('handles action with type FETCH_TODOS_FAILURE', () => {
        const action = { type: types.FETCH_TODOS_FAILURE, payload: new Error('Request failed with status code 500') };

        expect(todosListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false});
    });


    it('handles action with type UPDATE_TODO_STATUS_SUCCESS', () => {
        const page = 1;
        const todos = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            todos.push({_id: {$oid: index}, title: `Todo Title ${index}`, _status: 'not-started'});
        }
        const totalTodos = 25;
        const stateToStartWith = {...INITIAL_STATE, todos, totalTodos};

        const action = { type: types.UPDATE_TODO_STATUS_SUCCESS, payload: {id: 2, status: 'started'} };

        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, _status: action.payload.status};
                }

                return todo;
            })
        });
    });

    it('handles action with type DELETE_TODO_REQUEST and RESTORE_TODO_REQUEST', () => {
        const todos = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            todos.push({_id: {$oid: index}, title: `Todo Title ${index}`, _status: 'not-started'});
        }
        const totalTodos = 25;
        const stateToStartWith = {...INITIAL_STATE, todos, totalTodos};

        const action = { type: types.DELETE_TODO_REQUEST, payload: {id: 1}};

        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: true};
                }

                return todo;
            })
        });


        const action2 = { type: types.RESTORE_TODO_REQUEST, payload: {id: 1}};

        expect(todosListReducer(stateToStartWith, action2)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: true};
                }

                return todo;
            })
        });
    });

    it('handles action with type DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE, RESTORE_TODO_SUCCESS, and RESTORE_TODO_FAILURE', () => {
        const todos = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            todos.push({_id: {$oid: index}, title: `Todo Title ${index}`, _status: 'not-started'});
        }
        const totalTodos = 25;
        const stateToStartWith = {...INITIAL_STATE, todos, totalTodos};

        let action = { type: types.DELETE_TODO_SUCCESS, payload: {id: 1}};
        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: false};
                }

                return todo;
            })
        });

        action = { type: types.RESTORE_TODO_SUCCESS, payload: {id: 1}};
        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: false};
                }

                return todo;
            })
        });

        action = { type: types.DELETE_TODO_FAILURE, payload: {id: 1}};
        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: false};
                }

                return todo;
            })
        });

        action = { type: types.RESTORE_TODO_FAILURE, payload: {id: 1}};
        expect(todosListReducer(stateToStartWith, action)).toEqual({
            ...stateToStartWith,
            todos: stateToStartWith.todos.map(todo => {
                if(todo._id.$oid === action.payload.id) {
                    return {...todo, actionLoading: false};
                }

                return todo;
            })
        });
    });

    it('handles action with type SET_FILTER', () => {
        const filter = TodoFilterEnum.DELETED;
        const action = { type: types.SET_FILTER, payload: filter };

        expect(todosListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, filter});
    });

    it('handles action with type SET_TODO_SEARCH_TEXT', () => {
        const searchText = 'tag: Fruits';
        const action = { type: types.SET_TODO_SEARCH_TEXT, payload: searchText };

        expect(todosListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, searchText});
    });

});