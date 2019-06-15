import React from 'react';
import {connect} from 'react-redux';
import TodoUpsertForm from './TodoUpsertForm';
import {getTodoTags, upsertTodo} from '../../actions';

export class TodoCreate extends React.Component {
    componentDidMount() {
        this.props.getTodoTags();
    }

    onSubmit = formValues => {
        this.props.upsertTodo(null, formValues);
    };

    render() {
        const {loading, tags} = this.props;
        return <TodoUpsertForm title="Add Todo" tags={tags} loading={loading} onSubmit={this.onSubmit}/>;
    }
}

const mapStateToProps = state => {
    return {...state.upsertTodo};
};

export default connect(mapStateToProps, {getTodoTags, upsertTodo})(TodoCreate);
