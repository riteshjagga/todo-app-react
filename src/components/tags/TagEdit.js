import React from 'react';
import { connect } from 'react-redux';
import TagUpsertForm from './TagUpsertForm';
import {getTag, upsertTag} from '../../actions';

class TagEdit extends React.Component {
    componentDidMount() {
        this.props.getTag(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.upsertTag(this.props.match.params.id, formValues);
    };

    render() {
        const {tag,  loading} = this.props;
        return <TagUpsertForm title="Edit Tag" initialValues={{name: tag.name}} loading={loading} onSubmit={this.onSubmit} />;
    }
}

const mapStateToProps = state => {
    return {...state.upsertTag};
};

export default connect(mapStateToProps, {getTag, upsertTag})(TagEdit);
