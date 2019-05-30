import todoApi from '../apis/todoApi';
import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
    SET_FILTER,
    SET_SEARCH_TEXT,
    UPDATE_TODO_STATUS,
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
    GET_TODO_TAGS_REQUEST, GET_TODO_TAGS_SUCCESS, GET_TODO_TAGS_FAILURE,
    CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE
} from './types';
import TodoFilterEnum from '../enums/TodoFilterEnum';
import history from '../history';

export const fetchTodos = (page) => async (dispatch, getState) => {
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
        dispatch({type: FETCH_TODOS_SUCCESS, payload: {page, data: response.data}});
    } catch(error) {
        dispatch({type: FETCH_TODOS_FAILURE, payload: error});
    }
};

export const updateTodoStatus = (id, status) => async dispatch => {
    try {
        console.log(`Updating todo status => ${id} - ${status}`);
        const response = await todoApi.patch(`/todos/${id}/update_status`, {status});
        console.log(response);
        dispatch({type: UPDATE_TODO_STATUS, payload: {id, status}});
    } catch(error) {
        console.log(error);
    }
};

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        payload: filter
    }
};

export const setSearchText = searchText => {
    return {
        type: SET_SEARCH_TEXT,
        payload: searchText
    }
};

export const setFilterAndFetchTodos = filter => async (dispatch, getState) => {
    dispatch(setFilter(filter));
    await dispatch(fetchTodos(1));
};

export const setSearchTextAndFetchTodos = searchText => async (dispatch, getState) => {
    dispatch(setSearchText(searchText));
    await dispatch(fetchTodos(1));
};

export const getTags = () => async dispatch => {
    dispatch({type: GET_TAGS_REQUEST});

    try {
        const response = await todoApi.get('/tags');
        dispatch({type: GET_TAGS_SUCCESS, payload: response.data});
    } catch(error) {
        dispatch({type: GET_TAGS_FAILURE, payload: error});
    }
};

export const getTodoTags = todoId => async dispatch => {
    const isNew = (todoId === undefined);
    dispatch({type: GET_TODO_TAGS_REQUEST});

    try {
        const tagsResponse = await todoApi.get('/tags');
        const tags = tagsResponse.data.tags.map(tag => ({id: tag._id.$oid, name: tag.name}));

        let todoResponse = null;
        if(isNew) {
            todoResponse = Promise.resolve({title: ''});
        } else {
            todoResponse = Promise.resolve({title: 'Title to be edited'});
        }

        dispatch({type: GET_TODO_TAGS_SUCCESS, payload: {tags, todo: todoResponse, isNew}});
    } catch(error) {
        dispatch({type: GET_TODO_TAGS_FAILURE, payload: error});
    }
};

export const createTodo = formValues => async dispatch => {
    dispatch({type: CREATE_TODO_REQUEST});

    try {
        const response = await todoApi.post('/todos', {todo: {...formValues}});
        dispatch({type: CREATE_TODO_SUCCESS, payload: response.data});
        history.push('/');
    } catch(error) {
        dispatch({type: CREATE_TODO_FAILURE, payload: error});
    }
};
