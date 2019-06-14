import {INITIAL_STATE} from './tagsListReducer';
import tagsListReducer from './tagsListReducer';
import * as types from '../actions/types';

describe('Tags List Reducer', () => {

    it('handles action with unknown type', () => {
        expect(tagsListReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handles action with type GET_TAGS_REQUEST', () => {
        const action = { type: types.GET_TAGS_REQUEST };

        expect(tagsListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: true});
    });

    it('handles action with type GET_TAGS_SUCCESS', () => {
        const page = 1;
        const tags = [];
        for(let i = 0; i < 10; i++) {
            const index = (i+1);
            tags.push({id: index, name: `Tag ${index}`});
        }
        const totalTags = 25;

        const action = { type: types.GET_TAGS_SUCCESS, payload: {page, tags, totalTags} };

        expect(tagsListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false, page, tags, totalTags, totalPages: 3});
    });

    it('handles action with type GET_TAGS_FAILURE', () => {
        const action = { type: types.GET_TAGS_FAILURE, payload: new Error('Request failed with status code 500') };

        expect(tagsListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, loading: false});
    });

    it('handles action with type SET_TAG_SEARCH_TEXT', () => {
        const searchText = 'Fruits';
        const action = { type: types.SET_TAG_SEARCH_TEXT, payload: searchText };

        expect(tagsListReducer(INITIAL_STATE, action)).toEqual({...INITIAL_STATE, searchText});
    });

});