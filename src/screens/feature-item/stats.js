// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { Link } from 'react-router';
import { DataTable, TableHeader } from 'react-mdl';

import styles from './style.scss';

function mapStateToProps(state, props) {
    const { id } = props;

    return {
        stats: state.featuresStats[id] || []
    }
}

@connect(mapStateToProps)
export default class FeaturesStats extends Component {
    render() {
        const { stats } = this.props;
        return (
            <div className={styles.stats}>
                <DataTable
                    shadow={0}
                    rows={Object.keys(stats).map(type => {
                        return { type, value: stats[type] }
                    })}>
                    <TableHeader name="type">Stats</TableHeader>
                    <TableHeader numeric name="value">Value</TableHeader>
                </DataTable>
            </div>
        );
    }
}
