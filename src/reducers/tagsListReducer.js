import {
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    totalTags: 0,
    tags: []
};

const tagsListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_TAGS_REQUEST:
            return {...state, loading: true};
        case GET_TAGS_SUCCESS:
            const {tags, count: totalTags} = action.payload;
            return {...state, loading: false, tags, totalTags};
        case GET_TAGS_FAILURE:
            return {...state, loading: false};
        default:
            return state;
    }
};

export default tagsListReducer;
