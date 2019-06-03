import React from 'react';
import { connect } from 'react-redux';

class TagUpsertForm extends React.Component {
    render() {
        return (
            <div>TagUpsertForm</div>
        )
    }
}

const mapStateToProps = state => {
    return state.tagsList;
};

export default connect(mapStateToProps)(TagUpsertForm);
