import React from 'react';
import { connect } from 'react-redux';
import TagUpsertForm from './TagUpsertForm';
import {upsertTag} from '../../actions';

class TagCreate extends React.Component {

    onSubmit = formValues => {
        this.props.upsertTag(null, formValues);
    };

    render() {
        return <TagUpsertForm title="Add Tag" onSubmit={this.onSubmit}/>;
    }
}

const mapStateToProps = state => {
    return {...state.upsertTag};
};

export default connect(mapStateToProps, {upsertTag})(TagCreate);
