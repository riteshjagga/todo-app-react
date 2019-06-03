import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';

import Tags from '../common/Tags';
import {withStyles} from "@material-ui/core";
import history from '../../history';

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

class TodoItem extends React.Component {
    render() {
        const { classes, todo, indexForDisplay } = this.props;

        return (
            <React.Fragment>
                <TableRow className={classes.firstRow}>
                    <TableCell align="center" component="th" scope="row">{indexForDisplay}</TableCell>
                    <TableCell>
                        {todo.title}
                    </TableCell>
                    <TableCell>
                        <FormControl>
                            <Select value={todo._status}
                                    onChange={event => this.props.onStatusChange(todo, event.target.value)}
                                    inputProps={{
                                        name: 'status',
                                        id: 'todo-status',
                                    }}>
                                <MenuItem value="not_started">Not Started</MenuItem>
                                <MenuItem value="started">Started</MenuItem>
                                <MenuItem value="finished">Finished</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="right">
                        <Tooltip title="Edit">
                            <IconButton onClick={() => history.push(`/todos/edit/${todo._id.$oid}`)}><EditIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title={todo.is_deleted ? 'Restore' : 'Delete'}>
                        {
                            todo.is_deleted
                                ? <IconButton onClick={() => this.props.onTodoRestore(todo._id.$oid)} disabled={todo.actionLoading}><RestoreIcon/></IconButton>
                                : <IconButton onClick={() => this.props.onTodoDelete(todo._id.$oid)} disabled={todo.actionLoading}><DeleteIcon/></IconButton>
                        }
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow className={classes.secondRow}>
                    <TableCell className={classes.secondRowCell}>&nbsp;</TableCell>
                    <TableCell className={classes.secondRowCell} colSpan="3">
                        <Tags tags={todo.tags} onTagSelect={this.props.onTagSelect}/>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TodoItem);
