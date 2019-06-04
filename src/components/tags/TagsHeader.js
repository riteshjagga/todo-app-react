import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TagsSearchBox from './TagsSearchBox';
import PaginationItems from '../common/PaginationItems';
import history from '../../history';

const styles = {
    itemRow: {
        padding: '10px 24px',
        borderBottom: '1px solid #e0e0e0',
        '&:last-child': {
            padding: '0 24px 0 0'
        }
    }
};

class TagsHeader extends React.Component {
    render() {
        const {classes, loading, page, totalPages, itemsPerPage, totalTags, searchText} = this.props;

        return (
            <Paper elevation={0} style={{borderRadius: 0}}>
                <Grid container direction="column" alignItems="flex-start" justify="space-between">
                    <Grid item container alignItems="flex-start" justify="space-between" className={classes.itemRow}>
                        <Grid item>
                            <Typography variant="h6" color="inherit">Tags</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => history.push('/tags/new')}>Add Tag</Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center" className={classes.itemRow}>
                        <Grid item style={{flex: 1}}>
                            <TagsSearchBox loading={loading}
                                            searchText={searchText}
                                            onSearch={this.props.onSearch} />
                        </Grid>
                        <Grid item>
                            <PaginationItems loading={loading}
                                             page={page}
                                             totalPages={totalPages}
                                             itemsPerPage={itemsPerPage}
                                             totalItems={totalTags}
                                             onPreviousPage={this.props.onPreviousPage}
                                             onNextPage={this.props.onNextPage}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(TagsHeader);
