import React from 'react';
import {Provider} from 'react-redux';

/*import {createStore, applyMiddleware} from 'redux';
const createStoreWithMiddleware = applyMiddleware()(createStore);*/

//import configureMockStore from 'redux-mock-store';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {TodosHeader} from './TodosHeader';
import TodosSearchBox from './TodosSearchBox';
import PaginationItems from '../common/PaginationItems';


/*const mockStore = configureMockStore();
const store = mockStore({});*/

configure({ adapter: new Adapter() });

function shallowSetup() {
    const props = {
        classes: {},
        loading: true,
        totalTodos: 10,
        page: 1,
        totalPages: 1,
        itemsPerPage: 10,
        searchText: '',
        selectedFilter: {key: 'active', label: 'Active'}
    };

    const component = shallow(<TodosHeader {...props} />);

    return {props, component};
}

describe('TodosHeader component', () => {
    it('renders with search box and pagination items', () => {
        const {props, component} = shallowSetup();

        expect(component.find('#page-title').length).toBe(1);
        expect(component.find('#page-title').text()).toBe('Todos');
        expect(component.find(TodosSearchBox).length).toBe(1);
        expect(component.find(PaginationItems).length).toBe(1);
    });
});

