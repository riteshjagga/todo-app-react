import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableBody} from "@material-ui/core";
import TodoItem from './TodoItem';

const styles = {
    firstRow: {
        '& th': {
            borderBottom: 0
        },
        '& td': {
            borderBottom: 0
        }
    },
    secondRowCell: {
        paddingTop: 0
    }
};

class TodosTable extends React.Component {
    onStatusChange = () => {
        console.log('onStatusChange');
        console.log(this);
    };

    onTodoEdit = () => {
        console.log('onTodoEdit');
        console.log(this);
    };

    onTodoDelete = () => {
        console.log('onTodoDelete');
        console.log(this);
    };

    onTagSelect = () => {
        console.log('onTagSelect');
        console.log(this);
    };

    render() {
        const {todos} = this.props;

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{width: '50px'}}>S. No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell style={{width: '120px'}}>Status</TableCell>
                        <TableCell align="right" style={{width: '100px'}}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    todos.map(todo => <TodoItem key={todo.id}
                                                todo={todo}
                                                onStatusChange={this.onStatusChange}
                                                onTagSelect={this.onTagSelect}
                                                onTodoEdit={this.onTodoEdit}
                                                onTodoDelete={this.onTodoDelete} />)
                }
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(TodosTable);
