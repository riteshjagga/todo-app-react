import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

import TodoFilterEnum from '../../enums/TodoFilterEnum';
import {connect} from 'react-redux';
import {setTodoSearchText} from '../../actions';

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
        paddingLeft: 24,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 500,
        backgroundColor: '#f1f3f4',
        borderRadius: 0
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

class TodosSearchBox extends React.Component {

    state = {anchorEl: null};

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleMenuItemClick = (event, selectedFilter) => {
        this.setState({anchorEl: null});
        this.props.onFilterChange(selectedFilter);
    };

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
        const filters = TodoFilterEnum.toArray();
        const { anchorEl } = this.state;
        const { classes, loading, selectedFilter, searchText } = this.props;

        return (
            <form onSubmit={this.onFormSubmit} noValidate autoComplete="off">
                <Paper className={classes.root} elevation={0}>
                    <Button aria-owns={anchorEl ? 'todos-filter-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
                        {selectedFilter.label} <ArrowDropDownCircleIcon/>
                    </Button>
                    <Menu id="todos-filter-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                        {filters.map(filter => (<MenuItem key={filter.key} onClick={event => this.handleMenuItemClick(event, filter)}>{filter.label}</MenuItem>))}
                    </Menu>

                    <Divider className={classes.divider} />

                    <InputBase className={classes.input} placeholder="Search todos" value={searchText} onChange={event => this.props.setTodoSearchText(event.target.value)} />
                    
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

const TodosSearchBoxStyled = withStyles(styles)(TodosSearchBox);

const mapStateToProps = (state) => {
    return state.todosList;
};

export default connect(mapStateToProps, {setTodoSearchText})(TodosSearchBoxStyled);

