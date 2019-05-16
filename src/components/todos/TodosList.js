import React from 'react';
import TodosHeader from './TodosHeader';
import Paper from '@material-ui/core/Paper';

import TodosTable from './TodosTable';

class TodosList extends React.Component {

    componentDidMount() {
        // Load todos
    }

    render() {
        const searchText = 'Title';
        const tags = [
            {id: 1, name: 'Flowers'},
            {id: 2, name: 'Fruits'},
            {id: 3, name: 'Social'},
            {id: 4, name: 'Technical'}
        ];

        const todos = [];
        for(let i = 0; i < 10; i++) {
            todos.push({
                id: (i+1),
                title: `Todo ${i+1} title`,
                status: 'not-started',
                tags
            });
        }

        return (
            <Paper>
                <TodosHeader searchText={searchText} />
                <TodosTable todos={todos} />
            </Paper>
        );
    }
}

export default TodosList;
