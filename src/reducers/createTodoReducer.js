import {
    GET_TODO_TAGS_REQUEST,
    GET_TODO_TAGS_SUCCESS,
    GET_TODO_TAGS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    todo: {
        title: '',
        tag_ids: []
    },
    tags: []
};

const createTodoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_TODO_TAGS_REQUEST:
            return {...state, loading: true};
        case GET_TODO_TAGS_SUCCESS:
            return {...state, loading: false, ...action.payload};
        case GET_TODO_TAGS_FAILURE:
            return {...state, loading: false};
        default:
            return state;
    }
};

export default createTodoReducer;
