import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TagsSearchBox from './TagsSearchBox';
import PaginationItems from '../common/PaginationItems';
import history from '../../history';

class TagsHeader extends React.Component {
    render() {
        const {loading, page, totalPages, itemsPerPage, totalTags, searchText} = this.props;

        return (
            <Paper style={{padding: '20px 20px 0 20px'}}>
                <Grid container direction="column" spacing={8} alignItems="flex-start" justify="space-between">
                    <Grid item container alignItems="flex-start" justify="space-between">
                        <Grid item>
                            <Typography variant="h6" color="inherit">Tags</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => history.push('/tags/new')}>Add Tag</Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="space-between" alignItems="center">
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

export default TagsHeader;
