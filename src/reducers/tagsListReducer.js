import {
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    SET_TAG_SEARCH_TEXT
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    tags: [],
    totalTags: 0,
    page: 1,
    totalPages: 0,
    itemsPerPage: 10,
    searchText: ''
};

const tagsListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_TAGS_REQUEST:
            return {...state, loading: true};
        case GET_TAGS_SUCCESS:
            const {tags, totalTags, page} = action.payload;

            return {
                ...state,
                loading: false,
                tags,
                totalTags,
                page,
                totalPages: Math.ceil(totalTags / state.itemsPerPage)
            };
        case GET_TAGS_FAILURE:
            return {...state, loading: false};
        case SET_TAG_SEARCH_TEXT: {
            return {...state, searchText: action.payload};
        }
        default:
            return state;
    }
};

export default tagsListReducer;
