'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';

import { Panel, FormControl, FormGroup } from 'react-bootstrap';

import HistoryList from './historyList';

import ResultStore from '../store/ResultStore';

function getResultStore() {
    return {
        allResults: ResultStore.getAll().list
    };
}

class ResultPanel extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = getResultStore();
    }

    componentDidMount() {
        ResultStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResultStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(getResultStore());
    }

    render() {
        let rows = [];
        if (this.state && this.state.allResults) {
            const resultList = this.state.allResults;

            if (resultList) {
                resultList.map((item, index) => {
                    rows.push(<HistoryList key={item.id} data={item.result.data} status={item.result.status} url={item.result.config.url} method={item.result.config.method} timestamp={item.result.headers.date}/>); 
                });
            }
        }
        return (
            <div className="result-list">
                {rows}
            </div>
        )
    }
}

export default ResultPanel;