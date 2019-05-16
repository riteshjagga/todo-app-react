import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

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
    render() {
        const {classes, tags} = this.props;

        return (
            <Grid container alignItems="center" className={classes.tags}>
                <Grid item className={classes.tagIcon}>
                    <BookmarkBorderIcon fontSize="default"/>
                </Grid>
                {tags.map(tag => <Grid item key={tag.id} className={classes.tag} onClick={this.props.onTagSelect}>{tag.name}</Grid>)}
            </Grid>
        );
    }
}

export default withStyles(styles)(Tags);
