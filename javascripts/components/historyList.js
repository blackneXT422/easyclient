'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';

import { Panel, FormControl, FormGroup, Form, Label } from 'react-bootstrap';

class HistoryList extends Component {
    render() {
        const localTime = new Date(this.props.timestamp).toLocaleString();
        return (
            <Panel className="result-panel">
            <Form inline>
                <FormGroup>
                    <FormControl.Static>
                        Method: <Label bsStyle="warning">{this.props.method.toUpperCase()}</Label> Status: <Label bsStyle="warning">{this.props.status}</Label>
                    </FormControl.Static>
                    <FormControl type="text" className="history-url" defaultValue={this.props.url}/>
                    <FormControl.Static>
                        <Label bsStyle="info">{localTime}</Label>
                    </FormControl.Static>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea" className="response-body-textarea">
                    <FormControl componentClass="textarea" placeholder="Response Body" readOnly defaultValue={JSON.stringify(this.props.data, null, 4) }></FormControl>
                </FormGroup>
                </Form>
            </Panel>
        )
    }
}

export default HistoryList;