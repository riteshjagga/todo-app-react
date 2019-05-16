import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import TodoFilterEnum from '../../enums/TodoFilterEnum';

class TodosSearchBox extends React.Component {

    state = {
        anchorEl: null,
        selectedFilter: TodoFilterEnum.ACTIVE
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleMenuItemClick = (event, selectedFilter) => {
        this.setState({
            anchorEl: null,
            selectedFilter
        });
    };

    render() {
        const { anchorEl, selectedFilter } = this.state;
        const filters = TodoFilterEnum.toArray();

        return (
            <form noValidate autoComplete="off">
                <Grid container alignItems="center" spacing={8}>
                    <Grid item>
                        <Button aria-owns={anchorEl ? 'todos-filter-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}>
                            {selectedFilter.label}
                            <ArrowDropDownCircleIcon/>
                        </Button>
                        <Menu id="todos-filter-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                            {filters.map(filter => (<MenuItem key={filter.key} onClick={event => this.handleMenuItemClick(event, filter)}>{filter.label}</MenuItem>))}
                        </Menu>
                    </Grid>
                    <Grid item>
                        <InputBase placeholder="Search Todos" />
                        <IconButton aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default TodosSearchBox;
