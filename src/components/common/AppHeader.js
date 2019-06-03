import React from 'react';
import {NavLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
    title: {
        color: 'inherit',
        flex: 1
    },
    link: {
      color: '#fff',
      textDecoration: 'none'
    },
    active: {
        borderBottom: '4px solid #fff'
    }
};

class AppHeader extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems={"center"}>
                        <Typography variant="h6" className={classes.title}>
                            Todo App
                        </Typography>
                        <NavLink to="/todos" className={classes.link} activeClassName={classes.active}>
                            <Button className={classes.button} color={"inherit"}>
                                Todos
                            </Button>
                        </NavLink>
                        <NavLink to="/tags" className={classes.link} activeClassName={classes.active}>
                            <Button className={classes.button} color={"inherit"}>
                                Tags
                            </Button>
                        </NavLink>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(AppHeader);