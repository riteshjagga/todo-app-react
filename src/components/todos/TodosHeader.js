import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TodosSearchBox from './TodosSearchBox';
import history from '../../history';
import PaginationItems from "../common/PaginationItems";

const styles = {
    root: {
        borderRadius: 0,
        backgroundColor: '#f1f3f4'
    },
    itemRow: {
        padding: '10px 24px',
        borderBottom: '1px solid #e0e0e0',
        '&:last-child': {
            padding: '0 24px 0 0'
        }
    }
};

export class TodosHeader extends React.Component {
    render() {
        const {classes, loading, page, totalPages, itemsPerPage, totalTodos, selectedFilter, searchText} = this.props;

        return (
            <Paper elevation={0} className={classes.root}>
                <Grid container direction="column" alignItems="flex-start" justify="space-between">
                    <Grid item container alignItems="flex-start" justify="space-between" className={classes.itemRow}>
                        <Grid item>
                            <Typography variant="h6" color="inherit"><span id="page-title">Todos</span></Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => history.push('/todos/new')}>Add Todo</Button>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justify="space-between" className={classes.itemRow}>
                        <Grid item style={{flex: 1}}>
                            <TodosSearchBox loading={loading}
                                            selectedFilter={selectedFilter}
                                            onFilterChange={this.props.onFilterChange}
                                            searchText={searchText}
                                            onSearch={this.props.onSearch} />
                        </Grid>
                        <Grid item>
                            <PaginationItems loading={loading}
                                             page={page}
                                             totalPages={totalPages}
                                             itemsPerPage={itemsPerPage}
                                             totalItems={totalTodos}
                                             onPreviousPage={this.props.onPreviousPage}
                                             onNextPage={this.props.onNextPage}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(TodosHeader);
