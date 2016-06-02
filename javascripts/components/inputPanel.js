'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import LoadingButton from './loadingButton';
import Axios from 'axios';
import URL from 'url-parse';

import Actions from '../actions/Actions';

import { Panel, Button, Form, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';

class InputPanel extends Component {
    constructor(prop){
        super(prop);
        this.handleClick = this.handleClick.bind(this);
        this.methodChange = this.methodChange.bind(this);
        this.urlChange = this.urlChange.bind(this);
        this.requestBodyBlur = this.requestBodyBlur.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }
    
    handleClick(callback) {        
        this._send(callback);
    }
    
    _send(callback) {
        let me = this;
        let cb = function(response){
            if(response.status !== 401){
                Actions.create(response);
            }
            callback();
        }
        me.sendRequest(cb);
    }
    
    keyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this._send(()=>{});
        }
    }
    
    methodChange(event) {
        this.method = event.target.value;
    }
    
    urlChange(event) {
        this.url = event.target.value;
    }
    
    requestBodyBlur(event) {
        this.requestBody = event.target.value;
    }
    
    sendRequest(callback) {
        let method = this.method || 'get';
        let me = this;
        var data = this.requestBody;
        if(method === 'get'){
            data = null;
        }
        Axios({
            url: me.url,
            method: method,
            data: data,
            headers: {'Content-Type': 'application/json', 'X-Auth-Token': me.authToken}
        }).then((response)=>{
            callback(response);
        }).catch((response)=>{
            console.log('Exception in response '+response.status);
            if(response.status === 401){
                me.auth((authToken)=>{
                    me.authToken = authToken;
                    me.sendRequest(callback);
                });
            }
            callback(response);
        });
    }
    
    auth(callback) {
        const url = new URL(this.url);
        const port = KEYSTONE_PORT;
        const server = KEYSTONE_SERVER ? KEYSTONE_SERVER : url.hostname;
        let authurl = `http://${server}:${port}/v2.0/tokens`;
        console.log('auth url is ' + authurl);
        let postData = {
            "auth": {
                "tenantName": "admin",
                "passwordCredentials": {
                    "username": "admin",
                    "password": "contrail123"
                }
            }
        };
        Axios.post(authurl, postData).then((response) => {
            let authToken = response.data.access.token.id;
            callback(authToken);
        });
    }
    
    render(){
        return (
            <Panel className="input-panel">
                <Form inline>
                    <FormGroup>
                        <FormControl componentClass="select" placeholder="select" onChange={this.methodChange}>
                            <option value="get">GET</option>
                            <option value="post">POST</option>
                            <option value="put">PUT</option>
                            <option value="delete">DELETE</option>
                        </FormControl>
                        {` `}
                        <FormControl type="text" placeholder="Input URL" onChange={this.urlChange} onKeyDown={this.keyDown}/>
                    </FormGroup>
                    {` `}
                    <LoadingButton handleClick={this.handleClick}/>
                    <FormGroup controlId="formControlsTextarea">
                    <FormControl componentClass="textarea" placeholder="Request Body" onBlur={this.requestBodyBlur}></FormControl>
                </FormGroup>
                </Form>
            </Panel>
        )
    }
}

export default InputPanel;