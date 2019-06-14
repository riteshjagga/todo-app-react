import {INITIAL_STATE} from './upsertTodoReducer';
import upsertTodoReducer from './upsertTodoReducer';
import * as types from '../actions/types';

describe('Upsert Todo Reducer', () => {

    it('handles action with unknown type', () => {
        expect(upsertTodoReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handles action with type GET_TODO_TAGS_REQUEST', () => {
        const action = { type: types.GET_TODO_TAGS_REQUEST };

        expect(upsertTodoReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: true});
    });

    it('handles action with type GET_TODO_TAGS_SUCCESS', () => {
        const tags = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            tags.push({id: index, name: `Tag ${index}`});
        }
        const todo = { title: 'Todo 1', tag_ids: [1, 4, 6] };
        const stateToStartWith = {...INITIAL_STATE, todo, tags};

        const action = { type: types.GET_TODO_TAGS_SUCCESS, payload: {todo, tags} };

        expect(upsertTodoReducer(stateToStartWith, action)).toEqual({...stateToStartWith, loading: false});
    });

    it('handles action with type GET_TAG_FAILURE', () => {
        const action = { type: types.GET_TODO_TAGS_FAILURE, payload: new Error('Request failed with status code 500') };

        expect(upsertTodoReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false});
    });

});