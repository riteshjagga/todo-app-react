import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {TodoCreate} from './TodoCreate';
import TodoUpsertForm from './TodoUpsertForm';

configure({adapter: new Adapter()});

function shallowSetup() {
    const props = {
        getTodoTags: jest.fn(),
        upsertTodo: jest.fn()
    };
    const component = shallow(<TodoCreate {...props} />);

    return {props, component};
}

describe('TodoCreate', () => {

    it('gets todo and its associated tags', () => {
        const {props, component} = shallowSetup();

        expect(component.find(TodoUpsertForm).length).toBe(1);
        expect(props.getTodoTags.mock.calls.length).toBe(1);
    });

    it('creates todo', () => {
        const {props, component} = shallowSetup();
        const formValues = {title: 'Title 1' , tag_ids: [1, 2, 3]};
        component.find(TodoUpsertForm).props().onSubmit(formValues);

        expect(props.upsertTodo.mock.calls.length).toBe(1);
        expect(props.upsertTodo.mock.calls[0][0]).toBe(null);
        expect(props.upsertTodo.mock.calls[0][1]).toEqual(formValues);
    });

});
