import React from 'react';
import { connect } from 'react-redux';

import TagUpsertForm from './TagUpsertForm';

class TagCreate extends React.Component {
    render() {
        return (
            <div>
                <div>TagCreate</div>
                <TagUpsertForm></TagUpsertForm>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.tagsList;
};

export default connect(mapStateToProps)(TagCreate);
