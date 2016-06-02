require('../less/main.less');

'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import InputPanel from './components/inputPanel';
import ResultPanel from './components/resultPanel'

class AppContainer extends Component {
    render() {
        return(
            <div>
                <InputPanel />
                <ResultPanel />
            </div>
        )
    }
}

render(<AppContainer />, document.getElementById('main'));