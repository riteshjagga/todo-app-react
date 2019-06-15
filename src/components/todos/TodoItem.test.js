import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
import TodoItem from './TodoItem';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import Tags from '../common/Tags';
import history from '../../history';

configure({adapter: new Adapter()});

describe('TodoItem', () => {

    let shallow;

    function shallowSetup(isDeleted) {
        const props = {
            indexForDisplay: 13,
            todo: {
                _id: {$oid: 1},
                title: 'Todo item under testing...',
                _status: 'not-started',
                is_deleted: isDeleted,
                tags: [
                    {id: 1, name: 'Flowers'},
                    {id: 2, name: 'Fruits'}
                ]
            },
            onStatusChange: jest.fn(),
            onTodoDelete: jest.fn(),
            onTodoRestore: jest.fn()
        };
        const component = shallow(<TodoItem {...props} />);

        return { props, component };
    }

    beforeAll(() => {
        shallow = createShallow({ dive: true });
    });

    it('renders active todo item', () => {
        const {props, component} = shallowSetup(false);

        expect(component.find(Select).length).toBe(1);
        expect(component.find(TableRow).length).toBe(2);
        expect(component.find(TableCell).length).toBe(6);
        expect(component.find(TableCell).at(0).render().text()).toBe(props.indexForDisplay.toString());
        expect(component.find(TableCell).at(1).render().text()).toBe(props.todo.title);

        const iconButtons = component.find(IconButton);
        expect(iconButtons.length).toBe(2);
        expect(iconButtons.at(0).contains(<EditIcon/>)).toBe(true);
        expect(iconButtons.at(1).contains(<DeleteIcon/>)).toBe(true);
        expect(iconButtons.at(1).contains(<RestoreIcon/>)).toBe(false);

        const tooltips = component.find(Tooltip);
        expect(tooltips.length).toBe(2);
        expect(tooltips.at(0).prop('title')).toBe('Edit');
        expect(tooltips.at(1).prop('title')).toBe('Delete');

        expect(component.find(Tags).length).toBe(1);
    });

    it('renders deleted todo item', () => {
        const {props, component} = shallowSetup(true);

        expect(component.find(Select).length).toBe(1);
        expect(component.find(TableRow).length).toBe(2);
        expect(component.find(TableCell).length).toBe(6);
        expect(component.find(TableCell).at(0).render().text()).toBe(props.indexForDisplay.toString());
        expect(component.find(TableCell).at(1).render().text()).toBe(props.todo.title);

        const iconButtons = component.find(IconButton);
        expect(iconButtons.length).toBe(2);
        expect(iconButtons.at(0).contains(<EditIcon/>)).toBe(true);
        expect(iconButtons.at(1).contains(<DeleteIcon/>)).toBe(false);
        expect(iconButtons.at(1).contains(<RestoreIcon/>)).toBe(true);

        const tooltips = component.find(Tooltip);
        expect(tooltips.length).toBe(2);
        expect(tooltips.at(0).prop('title')).toBe('Edit');
        expect(tooltips.at(1).prop('title')).toBe('Restore');

        expect(component.find(Tags).length).toBe(1);
    });

    it('calls onStatusChange when status is changed', () => {
        const {props, component} = shallowSetup(false);

        const newStatus = 'started';
        component.find(Select).props().onChange({target: {value: newStatus}});

        expect(props.onStatusChange.mock.calls.length).toBe(1);
        expect(props.onStatusChange.mock.calls[0][1]).toBe(newStatus);
    });

    it('calls onTodoDelete when delete button is clicked', () => {
        const {props, component} = shallowSetup(false);
        const historyPushSpied = jest.spyOn(history, 'push');

        component.find(IconButton).at(0).props().onClick();

        expect(historyPushSpied).toHaveBeenCalled();
    });

    it('calls onTodoDelete when delete button is clicked', () => {
        const {props, component} = shallowSetup(false);
        component.find(IconButton).at(1).props().onClick();

        expect(props.onTodoDelete.mock.calls.length).toBe(1);
        // assert the id passed to onTodoDelete
        expect(props.onTodoDelete.mock.calls[0][0]).toBe(props.todo._id.$oid);
    });

    it('calls onTodoRestore when restore button is clicked', () => {
        const {props, component} = shallowSetup(true);
        component.find(IconButton).at(1).props().onClick();

        expect(props.onTodoRestore.mock.calls.length).toBe(1);
        // assert the id passed to onTodoDelete
        expect(props.onTodoRestore.mock.calls[0][0]).toBe(props.todo._id.$oid);
    });
});