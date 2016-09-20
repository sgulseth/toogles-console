// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { Link } from 'react-router';
import { Textfield, Checkbox, RadioGroup, Radio } from 'react-mdl';
import { omit } from 'lodash';

import styles from './style.scss';
import { ShareStrategy, QueryStrategy, FirstStrategy, HeaderStrategy, IPStrategy } from './strategies';
import Stats from './stats';

import { fetchFeatures, saveFeature, deleteFeature } from '../../redux/actions/features'
import { fetchFeaturesStats } from '../../redux/actions/features-stats'

function mapStateToProps(state, props) {
    const { params, location: { query }, routes } = props;

    return {
        feature: state.features[params.id] || {}
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchFeatures, saveFeature, deleteFeature, fetchFeaturesStats, replace
    }, dispatch);
}

@provideHooks({
    defer: ({ dispatch }) => {
        return Promise.all([
            dispatch(fetchFeatures()),
            dispatch(fetchFeaturesStats())
        ]);
    }
})
@connect(mapStateToProps, mapDispatchToProps)
export default class FeatureItem extends Component {
    constructor(props) {
        super()

        const feature = props.feature || {};
        const strategy = this.getFeatureStrategyName(feature);
        this.state = { strategy, strategyData: {}, feature };
    }

    componentWillReceiveProps({ feature }) {
        if (feature.id && feature.id !== this.props.feature.id) {
            const strategy = this.getFeatureStrategyName(feature);
            this.setState({ strategy, feature })
        }
    }

    selectStrategy(e) {
        this.setState({ strategy: e.target.value });
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.fetchFeaturesStats()
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getFeatureStrategyName(feature) {
        if (this.state && this.state.strategy) {
            return this.state.strategy
        }

        switch (true) {
            case  feature.shareStrategy !== undefined:
                return 'shareStrategy';

            case  feature.queryStrategy !== undefined:
                return 'queryStrategy';

            case  feature.firstStrategy !== undefined:
                return 'firstStrategy';

            case  feature.headerStrategy !== undefined:
                return 'headerStrategy';

            case  feature.ipStrategy !== undefined:
                return 'ipStrategy';
        }

        return '';
    }

    getStrategyComponent(strategy, options) {
        switch(strategy) {
            case 'shareStrategy':
                return <ShareStrategy {...options} onChange={this.onStrategyChange.bind(this)} />

            case 'queryStrategy':
                return <QueryStrategy {...options} onChange={this.onStrategyChange.bind(this)} />

            case 'firstStrategy':
                return <FirstStrategy {...options} onChange={this.onStrategyChange.bind(this)} />

            case 'headerStrategy':
                return <HeaderStrategy {...options} onChange={this.onStrategyChange.bind(this)} />

            case 'ipStrategy':
                return <IPStrategy {...options} onChange={this.onStrategyChange.bind(this)} />

            default:
                return <div className="unknown-strategy" />
        }
    }

    onFeaturePropChange(prop, val) {
        const feature = Object.assign(this.state.feature, {
            [prop]: val
        });

        this.setState({ feature });
    }

    onStrategyChange(strategyData) {
        this.setState({ strategyData })
    }

    save() {
        const strategy = this.state.strategy;
        if (!strategy) {
            console.error('Missing strategy');
            return;
        }

        const feature = Object.assign(this.props.feature, this.state.feature, {
            shareStrategy: null,
            queryStrategy: null,
            firstStrategy: null,
            headerStrategy: null,
            ipStrategy: null,
        }, {
            [strategy]: this.state.strategyData || this.state.feature[strategy]
        });

        this.props.saveFeature(feature).then(action => {
            if (action.payload.id) {
                this.props.replace(`/feature/${action.payload.id}/`);
            }
        })
    }

    delete() {
        if (this.state.feature.id && confirm('Are you sure you want to delete this feature?')) {
            this.props.deleteFeature(this.state.feature).then(action => {
                this.props.replace(`/`);
            });
        }
    }

    render() {
        const feature = Object.assign({}, this.props.feature, this.state.feature);
        const strategy = this.state.strategy;

        return (
            <div className={`mdl-card mdl-shadow--2dp ${styles.main}`}>
                <div className={styles.feature}>
                    <div className="mdl-card__title mdl-card--expand">
                        <h2 className="mdl-card__title-text">{feature.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <div>
                            <Textfield label="Name" value={feature.name} onChange={e => this.onFeaturePropChange('name', e.target.value)} floatingLabel />
                        </div>
                        <div>
                            <Textfield label="Description" value={feature.description} onChange={e => this.onFeaturePropChange('description', e.target.value)} floatingLabel />
                        </div>
                        <div>
                            <Checkbox label="Persistent" id="persistent" checked={feature.persistent} onChange={e => this.onFeaturePropChange('persistent', e.target.checked)} />
                        </div>
                        <div>
                            <Textfield label="Expire" value={feature.expire} onChange={e => this.onFeaturePropChange('expire', parseInt(e.target.value, 10))} floatingLabel />
                        </div>
                        <div>
                            <RadioGroup name="strategy" container="div" childContainer="div" value={strategy} onChange={this.selectStrategy.bind(this)}>
                                <Radio value="shareStrategy">Share strategy</Radio>
                                <Radio value="firstStrategy">First strategy</Radio>
                                <Radio value="queryStrategy">Query strategy</Radio>
                                <Radio value="headerStrategy">Header strategy</Radio>
                                <Radio value="ipStrategy">IP strategy</Radio>
                            </RadioGroup>
                        </div>
                        {this.getStrategyComponent(strategy, feature[strategy])}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.save.bind(this)}>
                            Save
                        </button>
                        <button className="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect" onClick={this.delete.bind(this)}>
                            Delete
                        </button>
                    </div>
                </div>
                <Stats id={feature.id} />
            </div>
        );
    }
}
