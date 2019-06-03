import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import history from '../../history'

const styles = {
    title: {
        color: 'inherit',
        flex: 1
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
                        <Button className={classes.button} color={"inherit"} onClick={() => history.push('/')}>
                            Todos
                        </Button>
                        <Button className={classes.button} color={"inherit"} onClick={() => history.push('/tags')}>
                            Tags
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(AppHeader);