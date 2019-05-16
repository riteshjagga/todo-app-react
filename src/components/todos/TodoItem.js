import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Tags from '../Tags';
import {withStyles} from "@material-ui/core";

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
    onTagSelect() {
        console.log(this.props);
    }

    render() {
        const { classes, todo } = this.props;

        return (
            <React.Fragment>
                <TableRow className={classes.firstRow}>
                    <TableCell align="center" component="th" scope="row">{todo.id}</TableCell>
                    <TableCell>
                        {todo.title}
                    </TableCell>
                    <TableCell>
                        <FormControl>
                            <Select value={todo.status}
                                    onChange={this.props.onStatusChange}
                                    inputProps={{
                                        name: 'status',
                                        id: 'todo-status',
                                    }}>
                                <MenuItem value="not-started">Not Started</MenuItem>
                                <MenuItem value="started">Started</MenuItem>
                                <MenuItem value="finished">Finished</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="right">
                        <IconButton onClick={this.props.onTodoEdit}><EditIcon/></IconButton>
                        <IconButton onClick={this.props.onTodoDelete}><DeleteIcon/></IconButton>
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
