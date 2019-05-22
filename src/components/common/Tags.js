import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NoDataMessage from '../common/NoDataMessage';

const styles = {
    tags: {
    },
    tagIcon: {
        color: '#FFD600',
        marginRight: 5
    },
    tag: {
        cursor: 'pointer',
        padding: '0.2em 0.6em 0.3em',
        border: '1px solid #FFD600',
        backgroundColor: 'transparent',
        color: '#333',
        borderRadius: 2,
        marginRight: 5,
        '&:last-child': {
            marginRight: 0
        },
        '&:hover': {
            backgroundColor: '#FFF9C4'
        }
    }
};

class Tags extends React.Component {
    renderTags = () => {
        const {classes, tags} = this.props;

        if(tags.length === 0) {
            return <NoDataMessage message="No tags" />
        } else {
            return tags.map(tag => (
                <Button size="small" key={tag._id.$oid} className={`${classes.margin} ${classes.tag}`} onClick={() => this.props.onTagSelect(tag.name)}>{tag.name}</Button>
            ));
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid container alignItems="center" className={classes.tags}>
                <Grid item className={classes.tagIcon}>
                    <BookmarkBorderIcon fontSize="default"/>
                </Grid>
                {this.renderTags()}
            </Grid>
        );
    }
}

export default withStyles(styles)(Tags);
