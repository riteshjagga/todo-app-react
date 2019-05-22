import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    noData: {
        textAlign: 'center',
        color: 'grey'
    }
};

class NoDataMessage extends React.Component {
    render() {
        const {classes, message} = this.props;
        return <div className={classes.noData}>{message}</div>;
    }
}

export default withStyles(styles)(NoDataMessage);
