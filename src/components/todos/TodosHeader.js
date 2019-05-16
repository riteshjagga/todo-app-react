import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TodosSearchBox from "./TodosSearchBox";
import TodosPagination from "./TodosPagination";

class TodosHeader extends React.Component {
    onSearch() {
        console.log('Searching...');
    }

    render() {
        console.log(this.props);
        return (
            <Paper style={{padding: '20px 20px 0 20px'}}>
                <Grid container direction="column" spacing={8} alignItems="flex-start" justify="space-between">
                    <Grid item container alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h6" color="inherit">Todos</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Add Todo
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item>
                            <TodosSearchBox onSearch={this.onSearch} />
                        </Grid>
                        <Grid item>
                            <TodosPagination />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default TodosHeader;
