import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Tooltip from '@material-ui/core/Tooltip';

class PaginationItems extends React.Component {
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
        const {page, itemsPerPage, totalItems} = this.props;

        let toItems = page * itemsPerPage;
        if (toItems > totalItems) {
            toItems = totalItems;
        }

        return toItems;
    };

    render() {
        const {totalItems} = this.props;

        return (
            <Grid container alignItems="center" spacing={8}>
                <Grid item>
                    <div>{this.fromItems()}-{this.toItems()} of {totalItems}</div>
                </Grid>
                <Grid item>
                    <Tooltip title="Previous Page">
                        <span>
                            <IconButton color="default"
                                        disabled={this.firstPage()}
                                        onClick={this.props.onPreviousPage}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Next Page">
                        <span>
                            <IconButton color="default"
                                        disabled={this.lastPage()}
                                        onClick={this.props.onNextPage}>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
}


export default PaginationItems;
