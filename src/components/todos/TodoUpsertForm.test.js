import React from 'react';
import {connect, Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createShallow} from '@material-ui/core/test-utils';
import {Field, reducer as formReducer} from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {TodoUpsertFormStyled} from './TodoUpsertForm';
import TodoUpsertForm from './TodoUpsertForm';
import history from '../../history';

const mockStore = configureMockStore();
const store = mockStore({
    form: formReducer
});

configure({adapter: new Adapter()});

describe('TodoUpsertForm', () => {

    describe('shallow component test cases', () => {

        let shallow;

        function shallowSetup(loading) {
            const props = {
                title: 'Edit Todo',
                loading,
                initialValues: {title: 'Shorten the duration of presentation', tag_ids: [1, 4, 5]},
                tags: [],
                submitting: false,
                //onSubmit: jest.fn(),
                handleSubmit: jest.fn(),
                // The real redux form has many properties for each field,
                // including onChange and onBlur handlers. We only need to provide
                // the ones that will change the rendered output.
                /*fields: {
                    title: {
                        value: '',
                        touched: false,
                        error: null
                    },
                    tag_ids: {
                        value: [],
                        touched: false,
                        error: null
                    }
                },*/
            };
            const component = shallow(<TodoUpsertFormStyled {...props} />);

            return {props, component};
        }

        beforeAll(() => {
            shallow = createShallow({ dive: true });
        });

        it('render form title with a back button', () => {
            const {props, component} = shallowSetup(false);

            expect(component.find(Typography).render().text()).toBe('Edit Todo');
            expect(component.find(IconButton).at(0).contains(<ArrowBackIcon/>)).toBe(true);
        });

        it('goes back to todos list page when back button is clicked', () => {
            const {props, component} = shallowSetup(false);
            const historyPushSpied = jest.spyOn(history, 'push');

            component.find(IconButton).at(0).props().onClick();

            expect(historyPushSpied).toHaveBeenCalled();
        });

        it('renders loading indicator when loading tags', () => {
            const {props, component} = shallowSetup(true);

            expect(component.find(CircularProgress).length).toBe(1);
            expect(component.find('form').length).toBe(0);
        });

        it('renders form when loading tags is complete', () => {
            const {props, component} = shallowSetup(false);

            expect(component.find(CircularProgress).length).toBe(0);
            expect(component.find('form').length).toBe(1);
            expect(component.find(Field).at(0).prop('name')).toBe('title');
            expect(component.find(Field).at(1).prop('name')).toBe('tag_ids');
        });

    });

    describe('mounted/connected component test cases', () => {

        function mountSetup() {
            const props = {
                loading: false,
                initialValues: {title: 'Complete unit testing', tag_ids: [1, 4, 5]},
                tags: [],
                submitting: false,
                //onSubmit: jest.fn(),
                handleSubmit: jest.fn(),
                // The real redux form has many properties for each field,
                // including onChange and onBlur handlers. We only need to provide
                // the ones that will change the rendered output.
                /*fields: {
                    title: {
                        value: 'Shorten the duration of presentation',
                        touched: false,
                        error: null
                    },
                    tag_ids: {
                        value: [],
                        touched: false,
                        error: null
                    }
                },*/
            };

            const mapStateToProps = () => {
                return {
                    ...props,
                    initialValues: {title: 'Complete unit testing', tag_ids: [1, 4, 5]}
                }
            };


            const TodoEdit = () => {
                return <TodoUpsertForm title="Edit Todo" tags={props.tags} initialValues={props.initialValues} />
            };

            const ConnectedForm = connect(mapStateToProps)(TodoEdit);
            const component = mount(
                <Provider store={store}>
                    <ConnectedForm/>
                </Provider>
            );

            /*const component = mount(
                <Provider store={store}>
                    <TodoUpsertForm {...props} initialValues={{title: 'Complete unit testing', tag_ids: [1, 4, 5]}} />
                </Provider>
            );*/

            return {props, component};
        }

        it('[Incomplete] checks if all form components are rendered with values', () => {
            const {props, component} = mountSetup();

            expect(component.find(CircularProgress).length).toBe(0);
            expect(component.find('form').length).toBe(1);

            const titleField = component.find(Field).at(0);
            expect(titleField.prop('name')).toBe('title');
            expect(titleField.prop('required')).toBe(true);
            expect(component.find(TextField).prop('label')).toBe('Title');

            const tagIdsField = component.find(Field).at(1);
            expect(tagIdsField.prop('name')).toBe('tag_ids');
            expect(tagIdsField.prop('required')).toBe(true);

            console.log(component.find('input').prop('name'));
            console.log(component.find('input').prop('value'));

            console.log(component.find('input').render().html());

        });
    });

});
