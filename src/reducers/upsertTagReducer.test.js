import {INITIAL_STATE} from './upsertTagReducer';
import upsertTagReducer from './upsertTagReducer';
import * as types from '../actions/types';

describe('Upsert Tag Reducer', () => {

    it('handles action with unknown type', () => {
        expect(upsertTagReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handles action with type GET_TAG_REQUEST', () => {
        const action = { type: types.GET_TAG_REQUEST };

        expect(upsertTagReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: true});
    });

    it('handles action with type GET_TAG_SUCCESS', () => {
        const tag = {id: 1, name: 'Fruits'};
        const action = { type: types.GET_TAG_SUCCESS, payload: {tag} };

        expect(upsertTagReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false, tag: {...tag}});
    });

    it('handles action with type GET_TAG_FAILURE', () => {
        const action = { type: types.GET_TAG_FAILURE, payload: new Error('Request failed with status code 500') };

        expect(upsertTagReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false});
    });

});