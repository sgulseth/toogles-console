// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { Link } from 'react-router';
import { values } from 'lodash';

import styles from './style.scss';

import { fetchFeatures } from '../../redux/actions/features'

import Feature from './feature';

function mapStateToProps(state) {
    return {
        features: values(state.features)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchFeatures
    }, dispatch);
}

@provideHooks({
    defer: ({ dispatch }) => {
        return Promise.all([
            dispatch(fetchFeatures(false)),
        ]);
    }
})
@connect(mapStateToProps, { fetchFeatures })
export default class FeatureList extends Component {
    render() {
        return (
            <div className={styles.main}>
                <div className={`app-feature-card-list ${styles.featureList}`}>
                    {this.props.features.map(feature => <Feature key={feature.id} feature={feature}/> )}
                </div>
                <Link className={`new-feature ${styles.newFeature}`} to="/feature">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                        <i className="material-icons">add</i>
                    </button>
                </Link>
            </div>
        );
    }
}
