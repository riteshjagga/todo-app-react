import React from 'react';
import {connect} from 'react-redux';
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
import CheckboxGroup from '../common/CheckboxGroup';

import {getTodoTags, createTodo} from '../../actions';
import history from '../../history';


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
    textField: {
        color: 'blue'
    },
    padding: {
        padding: 20
    }
};

class TodoCreate extends React.Component {

    componentDidMount() {
        this.props.getTodoTags();
    }

    goBack = () => {
        history.push('/');
    };

    renderTitle = ({input, meta, required}) => {
        return (
            <div>
                <TextField {...input} id="title" label="Title" required={required} margin="normal" error={meta.touched && !meta.valid} autoComplete={"off"}/>
                {this.renderError(meta)}
            </div>
        );
    };

    renderError = ({touched, valid, error}) => {
        return <FormHelperText error={touched && !valid}>{error}</FormHelperText>;
    };

    /*renderForm = () => {
        const {loading, tags, classes, submitting} = this.props;

        if(loading) {

        } else {
            return (

            );
        }
    };*/

    submitButton = props => <button {...props} type={"submit"} />;

    onSubmit = formValues => {
        this.props.createTodo(formValues);
    };

    render() {
        const {classes, tags, loading, submitting} = this.props;

        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">Add Todo</Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.padding}>
                    <form noValidate onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Grid container spacing={24} direction={"column"}>
                            <Grid item>
                                <Field name="title" component={this.renderTitle} required={true}/>
                            </Grid>
                            <Grid item>
                                <Field name="tag_ids" component={CheckboxGroup} required={true} label="Tags"
                                       options={tags}/>
                                {/*<Field name="tags"
                                               component={this.renderCheckboxGroup}
                                               options={tags}
                                               label={"Tags"} />*/}
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" component={this.submitButton}
                                        disabled={submitting}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title) {
        errors.title = 'Title is required';
    } else if(formValues.title.length < 5 || formValues.title.length > 150) {
        errors.title = 'Minimum 5 and maximum 150 characters';
    }

    if(!formValues.tag_ids || (formValues.tag_ids && formValues.tag_ids.length === 0)) {
        errors.tag_ids = 'Select at least one tag';
    }

    console.log(errors);
    return errors;
};

const mapStateToProps = state => {
    return {
        ...state.createTodo,
        //initialValues: {tags: ['5c8a44b38b48f5253b4b7b4c', '5c8a480b8b48f55958516e54']},
        /*initialValues: {title: '', tags: [...state.tagsList.tags]},
        ...state.form.todoCreate,*/
    };
};

const TodoCreateStyled = withStyles(styles)(TodoCreate);
const TodoCreateReduxForm = reduxForm({form: 'todoCreate', validate, touchOnChange: true})(TodoCreateStyled);
export default connect(mapStateToProps, {getTodoTags, createTodo})(TodoCreateReduxForm);
