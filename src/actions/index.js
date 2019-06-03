import todoApi from '../apis/todoApi';
import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
    SET_FILTER, SET_TODO_SEARCH_TEXT,
    UPDATE_TODO_STATUS_REQUEST, UPDATE_TODO_STATUS_SUCCESS, UPDATE_TODO_STATUS_FAILURE,
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
    SET_TAG_SEARCH_TEXT,
    GET_TAG_REQUEST, GET_TAG_SUCCESS, GET_TAG_FAILURE,
    UPSERT_TAG_REQUEST, UPSERT_TAG_SUCCESS, UPSERT_TAG_FAILURE,
    GET_TODO_TAGS_REQUEST, GET_TODO_TAGS_SUCCESS, GET_TODO_TAGS_FAILURE,
    UPSERT_TODO_REQUEST, UPSERT_TODO_SUCCESS, UPSERT_TODO_FAILURE,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
    RESTORE_TODO_REQUEST, RESTORE_TODO_SUCCESS, RESTORE_TODO_FAILURE
} from './types';
import TodoFilterEnum from '../enums/TodoFilterEnum';
import history from '../history';

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        payload: filter
    }
};

export const setTodoSearchText = searchText => {
    return {
        type: SET_TODO_SEARCH_TEXT,
        payload: searchText
    }
};

export const setTagSearchText = searchText => {
    return {
        type: SET_TAG_SEARCH_TEXT,
        payload: searchText
    }
};

export const fetchTodos = page => async (dispatch, getState) => {
    dispatch({type: FETCH_TODOS_REQUEST});

    const { itemsPerPage, filter, searchText } = getState().todosList;
    const params = {page, items_per_page: itemsPerPage};

    // Set deleted parameter
    if (filter === TodoFilterEnum.DELETED) {
        params.deleted = true;
    }

    // Set search parameter
    let url = '/todos';
    const index = searchText.search(/tag:/);
    if(index > -1) {
        const tagName = searchText.substring((index + 4)).trim();
        url = `/tags/${tagName}/todos`;
    } else if(searchText.length > 0) {
        params.title = searchText;
    }

    try {
        const response = await todoApi.get(url, {params});
        const {todos, count: totalTodos} = response.data;
        dispatch({type: FETCH_TODOS_SUCCESS, payload: {page, todos, totalTodos}});
    } catch(error) {
        dispatch({type: FETCH_TODOS_FAILURE, payload: error});
    }
};

export const updateTodoStatus = (todoId, status) => async dispatch => {
    dispatch({type: UPDATE_TODO_STATUS_REQUEST});
    try {
        console.log(`Updating todo status => ${todoId} - ${status}`);
        await todoApi.patch(`/todos/${todoId}/update_status`, {status});
        dispatch({type: UPDATE_TODO_STATUS_SUCCESS, payload: {id: todoId, status}});
    } catch(error) {
        dispatch({type: UPDATE_TODO_STATUS_FAILURE, payload: error});
    }
};

export const setFilterAndFetchTodos = filter => async (dispatch, getState) => {
    dispatch(setFilter(filter));
    await dispatch(fetchTodos(1));
};

export const setSearchTextAndFetchTodos = searchText => async (dispatch, getState) => {
    dispatch(setTodoSearchText(searchText));
    await dispatch(fetchTodos(1));
};

export const getTodoTags = (todoId = null) => async dispatch => {
    dispatch({type: GET_TODO_TAGS_REQUEST});
    const isNew = (todoId === null);

    try {
        const tagsResponse = await todoApi.get('/tags');
        const tags = tagsResponse.data.tags.map(tag => ({id: tag._id.$oid, name: tag.name}));

        const todoResponse = await (isNew ? Promise.resolve({data: {title: '', tag_ids: []}}) : todoApi.get(`/todos/${todoId}`));
        const todo = todoResponse.data;
        todo.tag_ids = todo.tag_ids.map(tagId => {
            return tagId.$oid;
        });

        dispatch({type: GET_TODO_TAGS_SUCCESS, payload: {isNew, todo, tags}});
    } catch(error) {
        dispatch({type: GET_TODO_TAGS_FAILURE, payload: error});
    }
};

export const upsertTodo = (todoId, formValues) => async dispatch => {
    dispatch({type: UPSERT_TODO_REQUEST});

    try {
        const response = await (todoId ? todoApi.put(`/todos/${todoId}`, {todo: {...formValues}}) : todoApi.post('/todos', {todo: {...formValues}}));
        dispatch({type: UPSERT_TODO_SUCCESS, payload: response.data});
        history.push('/todos');
    } catch(error) {
        dispatch({type: UPSERT_TODO_FAILURE, payload: error});
    }
};

export const deleteTodo = todoId => async dispatch => {
    console.log(todoId);
    dispatch({type: DELETE_TODO_REQUEST, payload: {id: todoId}});
    try {
        await todoApi.delete(`/todos/${todoId}`);
        dispatch({type: DELETE_TODO_SUCCESS, payload: {id: todoId}});
        dispatch(fetchTodos(1));
    } catch(error) {
        dispatch({type: DELETE_TODO_FAILURE, payload: {id: todoId, error}});
    }
};

export const restoreTodo = todoId => async dispatch => {
    dispatch({type: RESTORE_TODO_REQUEST, payload: {id: todoId}});
    try {
        await todoApi.patch(`/todos/${todoId}/undo_delete`);
        dispatch({type: RESTORE_TODO_SUCCESS, payload: {id: todoId}});
        dispatch(fetchTodos(1));
    } catch(error) {
        dispatch({type: RESTORE_TODO_FAILURE, payload: {id: todoId, error}});
    }
};

export const setSearchTextAndGetTags = searchText => async (dispatch, getState) => {
    dispatch(setTagSearchText(searchText));
    await dispatch(getTags(1));
};

export const getTags = page => async (dispatch, getState) => {
    dispatch({type: GET_TAGS_REQUEST});

    const { itemsPerPage, searchText } = getState().tagsList;
    const params = {page, items_per_page: itemsPerPage};

    if (searchText !== '') {
        params.name = searchText;
    }

    try {
        const response = await todoApi.get('/tags', {params});
        const {tags, count: totalTags} = response.data;
        dispatch({type: GET_TAGS_SUCCESS, payload: {page, tags, totalTags}});
    } catch(error) {
        dispatch({type: GET_TAGS_FAILURE, payload: error});
    }
};

export const getTag = tagId => async dispatch => {
    dispatch({type: GET_TAG_REQUEST});

    try {
        const response = await todoApi.get(`/tags/${tagId}`);
        dispatch({type: GET_TAG_SUCCESS, payload: {tag: response.data}});
    } catch(error) {
        dispatch({type: GET_TAG_FAILURE, payload: error});
    }
};

export const upsertTag = (tagId, formValues) => async dispatch => {
    dispatch({type: UPSERT_TAG_REQUEST});

    try {
        const response = await (tagId ? todoApi.put(`/tags/${tagId}`, {tag: {...formValues}}) : todoApi.post('/tags', {tag: {...formValues}}));
        dispatch({type: UPSERT_TAG_SUCCESS, payload: response.data});
        history.push('/tags');
    } catch(error) {
        dispatch({type: UPSERT_TAG_FAILURE, payload: error});
    }
};
