import {
    GET_TAG_REQUEST,
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    isNew: true,
    tag: {
        name: ''
    }
};

const upsertTagReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_TAG_REQUEST:
            return {...state, loading: true};
        case GET_TAG_SUCCESS:
            return {...state, loading: false, ...action.payload};
        case GET_TAG_FAILURE:
            return {...state, loading: false};
        default:
            return state;
    }
};

export default upsertTagReducer;
