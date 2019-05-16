import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

class TodosPagination extends React.Component {
    render() {
        return (
            <div>
                <span style={{marginRight: '5px'}}>1-10 of 50</span>
                <IconButton color="default">
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton color="default">
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        );
    }
}

export default TodosPagination;
