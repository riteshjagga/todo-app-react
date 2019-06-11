import React from 'react';
import {Provider} from 'react-redux';

/*import {createStore, applyMiddleware} from 'redux';
const createStoreWithMiddleware = applyMiddleware()(createStore);*/

import configureMockStore from 'redux-mock-store';


import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {TodosList} from './TodosList';
import TodosHeader from './TodosHeader';
import TodosTable from './TodosTable';
import PaginationItems from '../common/PaginationItems';

const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe('TodosList page', () => {
    it('renders with header and table', () => {

        const props = {
            loading: true,
            todos: [],
            totalTodos: 10,
            page: 1,
            totalPages: 1,
            itemsPerPage: 10,
            searchText: '',
            filter: {key: 'active', label: 'Active'},
            fetchTodos: jest.fn()
        };

        const component = mount(
            <Provider store={store}>
                <TodosList {...props} />
            </Provider>
        );

        expect(component.find(TodosHeader).length).toBe(1);
        expect(component.find(TodosTable).length).toBe(1);
    });

    it('renders header with pagination component', () => {
        const props = {
            loading: true,
            todos: [],
            totalTodos: 25,
            page: 1,
            totalPages: 1,
            itemsPerPage: 10,
            searchText: '',
            filter: {key: 'active', label: 'Active'},
            fetchTodos: jest.fn()
        };

        const component = mount(
            <Provider store={store}>
                <TodosList {...props} />
            </Provider>
        );

        expect(component.find(PaginationItems).length).toBe(1);
        expect(component.find('#pagination-text').length).toBe(1);
        expect(component.find('#pagination-text').text()).toBe('1-10 of 25');
    });


});

