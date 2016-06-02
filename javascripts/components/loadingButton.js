import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';

class LoadingButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let me = this;
        this.setState({ isLoading: true });
        this.props.handleClick(()=>{
            me.setState({ isLoading: false });
        });
    }

    render() {
        let isLoading = this.state.isLoading;
        return (
            <Button
                bsStyle="primary"
                className="send-btn"
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Sending...' : 'Send   '}
            </Button>
        );
    }
}

export default LoadingButton;