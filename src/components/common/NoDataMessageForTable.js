import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = {
    noData: {
        textAlign: 'center',
        color: 'grey',
        height: 200
    }
};

class NoDataMessageForTable extends React.Component {
    render() {
        const {classes, colSpan, message} = this.props;
        return <TableRow><TableCell colSpan={colSpan} className={classes.noData}>{message}</TableCell></TableRow>;
    }
}

export default withStyles(styles)(NoDataMessageForTable);
