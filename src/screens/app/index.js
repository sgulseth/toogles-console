// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import Header from '../../components/header';
import styles from './style.scss';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    render() {
        return (
            <div className={styles.main}>
                <Helmet
                    link={[
                        { rel: 'icon', href: '/favicon.png' },
                        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
                        { rel: 'stylesheet', href: 'https://code.getmdl.io/1.2.1/material.blue_grey-deep_orange.min.css' }
                    ]}
                    script={[
                        { src: 'https://code.getmdl.io/1.2.1/material.min.js' }
                    ]}
                />
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <Header />
                    <main className="mdl-layout__content" id="app">
                        { this.props.children }
                    </main>
                </div>
                <div id="toast" className="mdl-js-snackbar mdl-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button className="mdl-snackbar__action" type="button"></button>
                </div>
            </div>
        );
    }
}
