import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as types from './types';
import * as actions from './index';
import TodoFilterEnum from '../enums/TodoFilterEnum';
import todoApi from '../apis/todoApi';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('todo actions', () => {
    beforeEach(() => {});
    afterEach(() => {});

    it('creates an action to set todo filter', () => {
        const filter = TodoFilterEnum.ACTIVE;
        const expectedAction = {type: types.SET_FILTER, payload: filter};

        expect(actions.setFilter(filter)).toEqual(expectedAction);
    });

    it('creates an action to set todo search text', () => {
        const searchText = 'tag: Flower';
        const expectedAction = {type: types.SET_TODO_SEARCH_TEXT, payload: searchText};

        expect(actions.setTodoSearchText(searchText)).toEqual(expectedAction);
    });

    let mock, store;
    describe('fetching todos', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                todosList: {
                    loading: false,
                    todos: [],
                    totalTodos: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    filter: TodoFilterEnum.ACTIVE,
                    searchText: ''
                }
            });
        });

        it('creates FETCH_TODOS_REQUEST & FETCH_TODOS_SUCCESS when server returns a successful response', () => {
            const page = 2;
            const todos = [];
            for(let i = 0; i < 10; i++) {
                const index = (i+1);
                todos.push({id: index, title: `Todo Title ${index}`});
            }
            const totalTodos = 25;

            mock.onGet('/todos').reply(200, {todos, count: totalTodos});

            const expectedActions = [
                {type: types.FETCH_TODOS_REQUEST},
                {type: types.FETCH_TODOS_SUCCESS, payload: {page, todos, totalTodos}}
            ];

            return store.dispatch(actions.fetchTodos(page))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates FETCH_TODOS_REQUEST & FETCH_TODOS_SUCCESS when server returns an error response', () => {
            mock.onGet('/todos').reply(500, {});

            const expectedActions = [
                {type: types.FETCH_TODOS_REQUEST},
                {type: types.FETCH_TODOS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.fetchTodos(2))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('updating todo status', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                todosList: {
                    loading: false,
                    todos: [],
                    totalTodos: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    filter: TodoFilterEnum.ACTIVE,
                    searchText: ''
                }
            });
        });

        it('creates UPDATE_TODO_STATUS_REQUEST & UPDATE_TODO_STATUS_SUCCESS when server returns a successful response', () => {
            const todoId = 1, status = 'started';
            mock.onPatch(`/todos/${todoId}/update_status`, {status}).reply(200, {});

            const expectedActions = [
                {type: types.UPDATE_TODO_STATUS_REQUEST},
                {type: types.UPDATE_TODO_STATUS_SUCCESS, payload: {id: todoId, status}}
            ];

            return store.dispatch(actions.updateTodoStatus(todoId, status))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates UPDATE_TODO_STATUS_REQUEST & UPDATE_TODO_STATUS_FAILURE when server returns an error response', () => {
            const todoId = 1, status = 'started';
            mock.onPatch(`/todos/${todoId}/update_status`, {status}).reply(500, {});

            const expectedActions = [
                {type: types.UPDATE_TODO_STATUS_REQUEST},
                {type: types.UPDATE_TODO_STATUS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.updateTodoStatus(todoId, status))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('getting todo tags for a new todo item', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                upsertTodo: {
                    loading: true,
                    isNew: true,
                    todo: {
                        title: '',
                        tag_ids: []
                    },
                    tags: []
                }
            });
        });

        it('creates GET_TODO_TAGS_REQUEST & GET_TODO_TAGS_SUCCESS when server returns a successful response', () => {
            const todoId = null, tags = [];
            for(let i = 0; i < 10; i++) {
                const index = (i+1);
                tags.push({_id: {$oid: index}, name: `Tag ${index}`});
            }
            mock.onGet('/tags').reply(200, {tags, count: 25});

            const expectedTags = tags.map(tag => ({id: tag._id.$oid, name: tag.name}));
            const expectedActions = [
                {type: types.GET_TODO_TAGS_REQUEST},
                {type: types.GET_TODO_TAGS_SUCCESS, payload: {isNew: true, todo: {title: '', tag_ids: []}, tags: expectedTags}}
            ];

            return store.dispatch(actions.getTodoTags(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates GET_TODO_TAGS_REQUEST & GET_TODO_TAGS_FAILURE when server returns an error response', () => {
            const todoId = null;
            mock.onGet('/tags').reply(500, {});

            const expectedActions = [
                {type: types.GET_TODO_TAGS_REQUEST},
                {type: types.GET_TODO_TAGS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.getTodoTags(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('getting todo tags for an existing todo item', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                upsertTodo: {
                    loading: true,
                    isNew: true,
                    todo: {
                        title: '',
                        tag_ids: []
                    },
                    tags: []
                }
            });
        });

        it('creates GET_TODO_TAGS_REQUEST & GET_TODO_TAGS_SUCCESS when server returns a successful response', () => {
            const todoId = 1;
            const todo = {
                title: 'Title 1',
                tag_ids: [{$oid: 1}, {$oid: 2}, {$oid: 3}]
            };
            const tags = [];
            for(let i = 0; i < 10; i++) {
                const index = (i+1);
                tags.push({_id: {$oid: index}, name: `Tag ${index}`});
            }

            mock.onGet(`/todos/${todoId}`).reply(200, todo);
            mock.onGet('/tags').reply(200, {tags, count: 25});

            const expectedTags = tags.map(tag => ({id: tag._id.$oid, name: tag.name}));
            const expectedTodo = {...todo};
            expectedTodo.tag_ids = expectedTodo.tag_ids.map(tagId => {
                return tagId.$oid;
            });
            const expectedActions = [
                {type: types.GET_TODO_TAGS_REQUEST},
                {type: types.GET_TODO_TAGS_SUCCESS, payload: {isNew: false, todo: expectedTodo, tags: expectedTags}}
            ];

            return store.dispatch(actions.getTodoTags(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates GET_TODO_TAGS_REQUEST & GET_TODO_TAGS_FAILURE when server returns an error response', () => {
            const todoId = 1;
            mock.onGet(`/todos/${todoId}`).reply(500, {});
            mock.onGet('/tags').reply(500, {});

            const expectedActions = [
                {type: types.GET_TODO_TAGS_REQUEST},
                {type: types.GET_TODO_TAGS_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.getTodoTags(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('creating todo', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                todosList: {
                    loading: false,
                    todos: [],
                    totalTodos: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    filter: TodoFilterEnum.ACTIVE,
                    searchText: ''
                }
            });
        });

        it('creates UPSERT_TODO_REQUEST & UPSERT_TODO_SUCCESS when server returns a successful response', () => {
            const todoId = null, formValues = {title: 'New todo item', tag_ids: [1, 2, 3]};
            mock.onPost('/todos', {todo: {...formValues}}).reply(200, {});

            const expectedActions = [
                {type: types.UPSERT_TODO_REQUEST},
                {type: types.UPSERT_TODO_SUCCESS, payload: {}}
            ];

            return store.dispatch(actions.upsertTodo(todoId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates UPSERT_TODO_REQUEST & UPSERT_TODO_FAILURE when server returns an error response', () => {
            const todoId = null, formValues = {title: 'New todo item', tag_ids: [1, 2, 3]};
            mock.onPost('/todos', {todo: {...formValues}}).reply(500, {});

            const expectedActions = [
                {type: types.UPSERT_TODO_REQUEST},
                {type: types.UPSERT_TODO_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.upsertTodo(todoId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('editing todo', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                todosList: {
                    loading: false,
                    todos: [],
                    totalTodos: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    filter: TodoFilterEnum.ACTIVE,
                    searchText: ''
                }
            });
        });

        it('creates UPSERT_TODO_REQUEST & UPSERT_TODO_SUCCESS when server returns a successful response', () => {
            const todoId = 1, formValues = {title: 'New todo item', tag_ids: [1, 2, 3]};
            mock.onPut(`/todos/${todoId}`, {todo: {...formValues}}).reply(200, {});

            const expectedActions = [
                {type: types.UPSERT_TODO_REQUEST},
                {type: types.UPSERT_TODO_SUCCESS, payload: {}}
            ];

            return store.dispatch(actions.upsertTodo(todoId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates UPSERT_TODO_REQUEST & UPSERT_TODO_FAILURE when server returns an error response', () => {
            const todoId = 1, formValues = {title: 'New todo item', tag_ids: [1, 2, 3]};
            mock.onPut(`/todos/${todoId}`, {todo: {...formValues}}).reply(500, {});

            const expectedActions = [
                {type: types.UPSERT_TODO_REQUEST},
                {type: types.UPSERT_TODO_FAILURE, payload: new Error('Request failed with status code 500')}
            ];

            return store.dispatch(actions.upsertTodo(todoId, formValues))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

    describe('deleting todo', () => {
        beforeEach(() => {
            mock = new MockAdapter(todoApi);

            store = mockStore({
                todosList: {
                    loading: false,
                    todos: [],
                    totalTodos: 0,
                    page: 1,
                    totalPages: 0,
                    itemsPerPage: 10,
                    filter: TodoFilterEnum.ACTIVE,
                    searchText: ''
                }
            });
        });

        it('creates DELETE_TODO_REQUEST & DELETE_TODO_SUCCESS when server returns a successful response', () => {
            const todoId = 1;
            mock.onDelete(`/todos/${todoId}`).reply(200, {});

            const expectedActions = [
                {type: types.DELETE_TODO_REQUEST, payload: {id: todoId}},
                {type: types.DELETE_TODO_SUCCESS, payload: {id: todoId}},
                {type: types.FETCH_TODOS_REQUEST}
            ];

            return store.dispatch(actions.deleteTodo(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });

        it('creates DELETE_TODO_REQUEST & DELETE_TODO_FAILURE when server returns an error response', () => {
            const todoId = 1;
            mock.onDelete(`/todos/${todoId}`).reply(500, {});

            const expectedActions = [
                {type: types.DELETE_TODO_REQUEST, payload: {id: todoId}},
                {type: types.DELETE_TODO_FAILURE, payload: {id: todoId, error: new Error('Request failed with status code 500')}}
            ];

            return store.dispatch(actions.deleteTodo(todoId))
                .then(() => expect(store.getActions()).toEqual(expectedActions));
        });
    });

});
