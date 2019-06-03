import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import history from '../../history';

class TagItem extends React.Component {
    render() {
        const { tag, indexForDisplay } = this.props;

        return (
            <TableRow>
                <TableCell align="center" component="th" scope="row">{indexForDisplay}</TableCell>
                <TableCell>
                    {tag.name}
                </TableCell>
                <TableCell>
                    {tag.todo_ids.length} tags
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Edit">
                        <IconButton onClick={() => history.push(`/tags/edit/${tag._id.$oid}`)}><EditIcon/></IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

export default TagItem;
