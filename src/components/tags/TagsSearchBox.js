import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

import {connect} from 'react-redux';
import {setTagSearchText} from '../../actions';

const styles = {
    hide: {
        display: 'none'
    },
    show: {
        display: ''
    },
    progress: {
      padding: 10
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    }
};

class TagsSearchBox extends React.Component {

    onSearch = searchText => {
        this.props.onSearch(searchText);
    };

    onClearSearch = () => {
        this.onSearch('');
    };

    onFormSubmit = event => {
        event.preventDefault();
        this.onSearch(this.props.searchText);
    };

    render() {
        const { classes, loading, searchText } = this.props;

        return (
            <form onSubmit={this.onFormSubmit} noValidate autoComplete="off">
                <Paper className={classes.root} elevation={1}>
                    <InputBase className={classes.input} placeholder="Search tags by name" value={searchText} onChange={event => this.props.setTagSearchText(event.target.value)} />
                    
                    <CircularProgress size={24} className={`${classes.progress} ${loading ? classes.show : classes.hide}`} />

                    <Tooltip title="Clear Search">
                        <IconButton aria-label="Clear Search"
                                    onClick={() => this.onClearSearch('')}
                                    className={`${classes.iconButton} ${(searchText.length === 0) ? classes.hide : classes.show} ${loading ? classes.hide : classes.show}`}>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Search">
                        <IconButton aria-label="Search"
                                    onClick={() => this.onSearch(searchText)}
                                    className={`${classes.iconButton} ${(searchText.length === 0) ? classes.show : classes.hide} ${loading ? classes.hide : classes.show}`}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Paper>

            </form>
        );
    }
}

const TagsSearchBoxStyled = withStyles(styles)(TagsSearchBox);

const mapStateToProps = (state) => {
    return state.tagsList;
};

export default connect(mapStateToProps, {setTagSearchText})(TagsSearchBoxStyled);

