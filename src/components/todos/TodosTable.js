import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableBody} from "@material-ui/core";
import TodoItem from './TodoItem';
import NoDataMessageForTable from '../common/NoDataMessageForTable';

class TodosTable extends React.Component {

    getIndexForDisplay = (index) => {
        const {page, itemsPerPage} = this.props;
        return ((page - 1) * itemsPerPage) + index + 1;
    };

    renderTodoItems() {
        const {todos} = this.props;

        if(todos.length === 0) {
            return <NoDataMessageForTable colSpan={4} message="There are no todos" />;
        } else {
            return todos.map((todo, index) => {
                const indexForDisplay = this.getIndexForDisplay(index);
                return <TodoItem key={todo._id.$oid}
                                 indexForDisplay={indexForDisplay}
                                 todo={todo}
                                 onStatusChange={this.props.onTodoStatusChange}
                                 onTagSelect={this.props.onTagSelect}
                                 onTodoEdit={this.props.onTodoEdit}
                                 onTodoDelete={this.props.onTodoDelete}
                                 onTodoRestore={this.props.onTodoRestore}/>;
            });
        }
    }

    render() {
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
                <TableBody>{this.renderTodoItems()}</TableBody>
            </Table>
        );
    }
}

export default TodosTable;
