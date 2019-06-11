import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as types from './types';
import * as actions from './index';
import TodoFilterEnum from '../enums/TodoFilterEnum';
import todoApi from '../apis/todoApi';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tag actions', () => {
    beforeEach(() => {});
    afterEach(() => {});

    it('creates an action to set tag search text', () => {
        const searchText = 'Technical';
        const expectedAction = {type: types.SET_TAG_SEARCH_TEXT, payload: searchText};

        expect(actions.setTagSearchText(searchText)).toEqual(expectedAction);
    });

    let mock, store;
    describe('getting tags', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                tagsList: {
                    loading: false,
                    tags: [],
                    totalTags: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    searchText: ''
                }
            });
        });

        it('creates GET_TAGS_REQUEST & GET_TAGS_SUCCESS when server returns a successful response', () => {
            const page = 2;
            const tags = [];
            for(let i = 0; i < 10; i++) {
                const index = (i+1);
                tags.push({id: index, name: `Tag ${index}`});
            }
            const totalTags = 25;

            mock.onGet('/tags').reply(200, {tags, count: totalTags});

            const expectedActions = [
                {type: types.GET_TAGS_REQUEST},
                {type: types.GET_TAGS_SUCCESS, payload: {page, tags, totalTags}}
            ];

            return store.dispatch(actions.getTags(page))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates GET_TAGS_REQUEST & GET_TAGS_FAILURE when server returns an error response', () => {
            const page = 2;
            mock.onGet('/tags').reply(500, {});

            const expectedActions = [
                {type: types.GET_TAGS_REQUEST},
                {type: types.GET_TAGS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.getTags(page))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('setting search text and getting tags', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                tagsList: {
                    loading: false,
                    tags: [],
                    totalTags: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    searchText: ''
                }
            });
        });

        it('sets search text and creates GET_TAGS_REQUEST & GET_TAGS_SUCCESS when server returns a successful response', () => {
            const searchText = 'Technical';
            const tags = [];
            for(let i = 0; i < 10; i++) {
                const index = (i+1);
                tags.push({id: index, name: `Tag ${index}`});
            }
            const totalTags = 25;
            mock.onGet('/tags').reply(200, {tags, count: totalTags});

            const expectedActions = [
                {type: types.SET_TAG_SEARCH_TEXT, payload: searchText},
                {type: types.GET_TAGS_REQUEST},
                {type: types.GET_TAGS_SUCCESS, payload: {page: 1, tags, totalTags}}
            ];

            return store.dispatch(actions.setSearchTextAndGetTags(searchText))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates GET_TAGS_REQUEST & GET_TAGS_FAILURE when server returns an error response', () => {
            const searchText = 'Technical';
            mock.onGet('/tags').reply(500, {});

            const expectedActions = [
                {type: types.SET_TAG_SEARCH_TEXT, payload: searchText},
                {type: types.GET_TAGS_REQUEST},
                {type: types.GET_TAGS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.setSearchTextAndGetTags(searchText))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('getting tag', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                tagsList: {
                    loading: false,
                    tags: [],
                    totalTags: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    searchText: ''
                }
            });
        });

        it('creates GET_TAG_REQUEST & GET_TAG_SUCCESS when server returns a successful response', () => {
            const tagId = 2;
            const tag = {id: 2, name: 'Tag 2'};
            mock.onGet(`/tags/${tagId}`).reply(200, tag);

            const expectedActions = [
                {type: types.GET_TAG_REQUEST},
                {type: types.GET_TAG_SUCCESS, payload: {tag}}
            ];

            return store.dispatch(actions.getTag(tagId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates GET_TAG_REQUEST & GET_TAG_FAILURE when server returns an error response', () => {
            const tagId = 2;
            const tag = {id: 2, name: 'Tag 2'};
            mock.onGet(`/tags/${tagId}`).reply(500, {});

            const expectedActions = [
                {type: types.GET_TAG_REQUEST},
                {type: types.GET_TAG_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.getTag(tagId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('creating tag', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                tagsList: {
                    loading: false,
                    tags: [],
                    totalTags: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    searchText: ''
                }
            });
        });

        it('creates UPSERT_TAG_REQUEST & UPSERT_TAG_SUCCESS when server returns a successful response', () => {
            const tagId = null, formValues = {name: 'Fruits'};
            mock.onPost('/tags', {tag: {...formValues}}).reply(200, {});

            const expectedActions = [
                {type: types.UPSERT_TAG_REQUEST},
                {type: types.UPSERT_TAG_SUCCESS, payload: {}}
            ];

            return store.dispatch(actions.upsertTag(tagId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates UPSERT_TAG_REQUEST & UPSERT_TAG_FAILURE when server returns an error response', () => {
            const tagId = null, formValues = {name: 'Fruits'};
            mock.onPost('/tags', {tag: {...formValues}}).reply(500, {});

            const expectedActions = [
                {type: types.UPSERT_TAG_REQUEST},
                {type: types.UPSERT_TAG_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.upsertTag(tagId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('editing tag', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                tagsList: {
                    loading: false,
                    tags: [],
                    totalTags: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    searchText: ''
                }
            });
        });

        it('creates UPSERT_TAG_REQUEST & UPSERT_TAG_SUCCESS when server returns a successful response', () => {
            const tagId = 1, formValues = {name: 'Fruits'};
            mock.onPut(`/tags/${tagId}`, {tag: {...formValues}}).reply(200, {});

            const expectedActions = [
                {type: types.UPSERT_TAG_REQUEST},
                {type: types.UPSERT_TAG_SUCCESS, payload: {}}
            ];

            return store.dispatch(actions.upsertTag(tagId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates UPSERT_TAG_REQUEST & UPSERT_TAG_FAILURE when server returns an error response', () => {
            const tagId = 1, formValues = {name: 'Fruits'};
            mock.onPut(`/tags/${tagId}`, {tag: {...formValues}}).reply(500, {});

            const expectedActions = [
                {type: types.UPSERT_TAG_REQUEST},
                {type: types.UPSERT_TAG_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.upsertTag(tagId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });
});
