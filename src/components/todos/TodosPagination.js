import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

class TodosPagination extends React.Component {
    firstPage = () => {
        return (this.props.page === 1);
    };

    lastPage = () => {
        const {page, totalPages} = this.props;
        return ((totalPages === 0) || (page === totalPages));
    };

    fromItems = () => {
        const {page, totalPages, itemsPerPage} = this.props;
        return (totalPages === 0) ? 0 : (((page - 1) * itemsPerPage) + 1);
    };

    toItems = () => {
        const {page, itemsPerPage, totalTodos} = this.props;

        let toItems = page * itemsPerPage;
        if (toItems > totalTodos) {
            toItems = totalTodos;
        }

        return toItems;
    };

    render() {
        const {totalTodos} = this.props;

        return (
            <Grid container alignItems="center" spacing={8}>
                <Grid item>
                    <div>{this.fromItems()}-{this.toItems()} of {totalTodos}</div>
                </Grid>
                <Grid item>
                    <IconButton color="default"
                                disabled={this.firstPage()}
                                onClick={this.props.onPreviousPage}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton color="default"
                                disabled={this.lastPage()}
                                onClick={this.props.onNextPage}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}


export default TodosPagination;
