import React from 'react';
import { connect } from 'react-redux';

class TagsList extends React.Component {
    render() {
        return (
            <div>TagsList</div>
        )
    }
}

const mapStateToProps = state => {
    return state.tagsList;
};

export default connect(mapStateToProps)(TagsList);
