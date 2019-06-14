import React from 'react';
import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import TodosTable from './TodosTable';
import NoDataMessageForTable from '../common/NoDataMessageForTable';
import TodoItem from './TodoItem';

configure({adapter: new Adaptor()});

function getIndexForDisplay (index, page, itemsPerPage) {
    return ((page - 1) * itemsPerPage) + index + 1;
}

describe('Todos Table', () => {

    it('renders no data message when there are no todos', () => {
       const props = { todos: [] };
       const component = shallow(<TodosTable {...props} />);

       expect(component.find(NoDataMessageForTable).length).toBe(1);
       expect(component.find(NoDataMessageForTable).prop('message')).toBe('There are no todos');
    });


    it('renders todo items', () => {
        const todos = [];
        for(let i = 0, index = (i+1); i < 10; i++) {
            todos.push({_id: {$oid: index}, title: `Todo ${index}`});
        }

        const props = { todos };
        const component = shallow(<TodosTable {...props} />);

        expect(component.find(TodoItem).length).toBe(10);
    });


    it('renders todo items with correct display number based on current page and items per page', () => {
        const todos = [];
        for(let i = 0, index = (i+1); i < 10; i++) {
            todos.push({_id: {$oid: index}, title: `Todo ${index}`});
        }
        const page = 2;
        const itemsPerPage = 10;
        const props = { todos, page, itemsPerPage };
        const component = shallow(<TodosTable {...props} />);

        const todoItems = component.find(TodoItem);
        expect(todoItems.length).toBe(10);

        todos.forEach((todo, index) => {
            expect(todoItems.at(index).prop('indexForDisplay')).toBe(getIndexForDisplay(index, page, itemsPerPage));
        });

    });

});