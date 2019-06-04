import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Field, reduxForm} from 'redux-form';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from "../../history";

const styles = {
    center: {
        textAlign: 'center'
    },
    hide: {
        display: 'none'
    },
    show: {
        display: ''
    },
    progress: {
        padding: 10
    },
    textField: {
        color: 'blue'
    },
    container: {
        padding: 20,
        minHeight: 250,
        borderRadius: 0
    }
};

class TagUpsertForm extends React.Component {

    goBack = () => {
        history.push('/tags');
    };

    renderName = ({input, meta, required}) => {
        return (
            <div>
                <TextField {...input} id="name" label="Name" required={required} margin="normal" error={meta.touched && !meta.valid} autoComplete={"off"}/>
                {this.renderError(meta)}
            </div>
        );
    };

    renderError = ({touched, valid, error}) => {
        return <FormHelperText error={touched && !valid}>{error}</FormHelperText>;
    };

    submitButton = props => <button {...props} type={"submit"} />;

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    renderForm = () => {
        const {classes, loading, submitting} = this.props;

        if(loading) {
            return (
                <div className={classes.center}>
                    <CircularProgress size={24} className={`${classes.progress} ${loading ? classes.show : classes.hide}`} />
                </div>
            );
        } else {
            return (
                <form noValidate onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Grid container spacing={24} direction={"column"}>
                        <Grid item>
                            <Field name="name" component={this.renderName} required={true}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" component={this.submitButton}
                                    disabled={submitting}>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            );
        }
    };

    render() {
        const {classes, title} = this.props;

        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">{title}</Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.container}>
                    {this.renderForm()}
                </Paper>
            </div>
        )
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.name) {
        errors.name = 'Name is required';
    } else if(formValues.name.length < 3 || formValues.name.length > 25) {
        errors.name = 'Minimum 3 and maximum 25 characters';
    }

    return errors;
};

const TagUpsertFormStyled = withStyles(styles)(TagUpsertForm);
export default reduxForm({form: 'tagUpsertForm', validate, enableReinitialize: true, touchOnChange: true})(TagUpsertFormStyled);
