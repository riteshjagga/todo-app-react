import React from 'react';
import {connect} from 'react-redux';
import TodoUpsertForm from './TodoUpsertForm';
import {getTodoTags, upsertTodo} from '../../actions';

class TodoEdit extends React.Component {
    componentDidMount() {
        this.props.getTodoTags(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.upsertTodo(this.props.match.params.id, formValues);
    };

    render() {
        const {todo, tags, loading} = this.props;
        const {title, tag_ids} = todo;
        return <TodoUpsertForm title="Edit Todo" initialValues={{title, tag_ids}} tags={tags} loading={loading} onSubmit={this.onSubmit} />;
    }
}

const mapStateToProps = state => {
    return {...state.upsertTodo};
};

export default connect(mapStateToProps, {getTodoTags, upsertTodo})(TodoEdit);
