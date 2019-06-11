import todoApi from '../apis/todoApi';
import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE,
    SET_TAG_SEARCH_TEXT,
    GET_TAG_REQUEST, GET_TAG_SUCCESS, GET_TAG_FAILURE,
    UPSERT_TAG_REQUEST, UPSERT_TAG_SUCCESS, UPSERT_TAG_FAILURE,
} from './types';
import history from '../history';

export const setTagSearchText = searchText => {
    return {
        type: SET_TAG_SEARCH_TEXT,
        payload: searchText
    }
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

export const setSearchTextAndGetTags = searchText => async (dispatch, getState) => {
    dispatch(setTagSearchText(searchText));
    await dispatch(getTags(1));
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
