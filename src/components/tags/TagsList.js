import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import TagsHeader from './TagsHeader';
import TagsTable from './TagsTable';
import {getTags, setSearchTextAndGetTags} from '../../actions';

class TagsList extends React.Component {

    componentDidMount() {
        this.props.getTags(1);
    }

    handlePreviousPage = () => {
        const page = this.setPageWithinBounds(this.props.page - 1);
        this.props.getTags(page);
    };

    handleNextPage = () => {
        const page = this.setPageWithinBounds(this.props.page + 1);
        this.props.getTags(page);
    };

    setPageWithinBounds(page) {
        if (page < 1) {
            page = 1;
        } else if (page > this.props.totalPages) {
            page = this.props.totalPages;
        }

        return page;
    }

    handleSearch = searchText => {
        this.props.setSearchTextAndGetTags(searchText);
    };

    render() {
        const { loading, tags, totalTags, page, totalPages, itemsPerPage, searchText } = this.props;

        return (
            <Paper>
                <TagsHeader loading={loading}
                             searchText={searchText}
                             totalTags={totalTags}
                             page={page}
                             totalPages={totalPages}
                             itemsPerPage={itemsPerPage}
                             onSearch={this.handleSearch}
                             onPreviousPage={this.handlePreviousPage}
                             onNextPage={this.handleNextPage}/>
                <TagsTable tags={tags}
                            page={page}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}/>
            </Paper>
        );

    }
}

const mapStateToProps = state => {
    return state.tagsList;
};

export default connect(mapStateToProps, {getTags, setSearchTextAndGetTags})(TagsList);
