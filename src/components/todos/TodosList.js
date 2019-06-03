import React from 'react';
import {connect} from 'react-redux';
import TodosHeader from './TodosHeader';
import Paper from '@material-ui/core/Paper';

import {
    fetchTodos,
    setFilterAndFetchTodos,
    setSearchTextAndFetchTodos,
    updateTodoStatus,
    deleteTodo,
    restoreTodo
} from "../../actions";
import TodosTable from './TodosTable';

class TodosList extends React.Component {

    componentDidMount() {
        this.props.fetchTodos(1);
    }

    handlePreviousPage = () => {
        const page = this.setPageWithinBounds(this.props.page - 1);
        this.props.fetchTodos(page);
    };

    handleNextPage = () => {
        const page = this.setPageWithinBounds(this.props.page + 1);
        this.props.fetchTodos(page);
    };

    setPageWithinBounds(page) {
        if (page < 1) {
            page = 1;
        } else if (page > this.props.totalPages) {
            page = this.props.totalPages;
        }

        return page;
    }

    handleTodoStatusChange = (todo, status) => {
        this.props.updateTodoStatus(todo._id.$oid, status);
    };

    handleSearch = searchText => {
        this.props.setSearchTextAndFetchTodos(searchText);
    };

    handleTagSelect = tagName => {
        this.handleSearch(`tag: ${tagName}`);
    };

    handleFilterChange = filter => {
        this.props.setFilterAndFetchTodos(filter);
    };

    handleTodoDelete = todoId => {
      this.props.deleteTodo(todoId);
    };

    handleTodoRestore = todoId => {
        this.props.restoreTodo(todoId);
    };

    render() {
        const { loading, todos, totalTodos, page, totalPages, itemsPerPage, searchText, filter } = this.props;

        return (
            <Paper>
                <TodosHeader loading={loading}
                             searchText={searchText}
                             totalTodos={totalTodos}
                             page={page}
                             totalPages={totalPages}
                             itemsPerPage={itemsPerPage}
                             selectedFilter={filter}
                             onFilterChange={this.handleFilterChange}
                             onSearch={this.handleSearch}
                             onPreviousPage={this.handlePreviousPage}
                             onNextPage={this.handleNextPage}/>
                <TodosTable todos={todos}
                            page={page}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            onTodoStatusChange={this.handleTodoStatusChange}
                            onTodoDelete={this.handleTodoDelete}
                            onTodoRestore={this.handleTodoRestore}
                            onTagSelect={this.handleTagSelect}/>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return state.todosList;
};

export default connect(mapStateToProps, {
    fetchTodos,
    setFilterAndFetchTodos,
    setSearchTextAndFetchTodos,
    updateTodoStatus,
    deleteTodo,
    restoreTodo
})(TodosList);
