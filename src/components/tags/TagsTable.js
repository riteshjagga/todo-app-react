import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableBody} from "@material-ui/core";
import TagItem from './TagItem';
import NoDataMessageForTable from '../common/NoDataMessageForTable';

class TagsTable extends React.Component {

    getIndexForDisplay = (index) => {
        const {page, itemsPerPage} = this.props;
        return ((page - 1) * itemsPerPage) + index + 1;
    };

    renderTagItems() {
        const {tags} = this.props;

        if(tags.length === 0) {
            return <NoDataMessageForTable colSpan={4} message="There are no tags" />;
        } else {
            return tags.map((tag, index) => {
                const indexForDisplay = this.getIndexForDisplay(index);
                return <TagItem key={tag._id.$oid}
                                 indexForDisplay={indexForDisplay}
                                 tag={tag}
                                 onTagEdit={this.props.onTagEdit}/>;
            });
        }
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{width: '50px'}}>S. No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell style={{width: '120px'}}>Tags</TableCell>
                        <TableCell align="right" style={{width: '100px'}}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{this.renderTagItems()}</TableBody>
            </Table>
        );
    }
}

export default TagsTable;
