import React, { Component } from 'react';

import { Slider } from 'react-mdl';

export default class ShareStrategy extends Component {
    constructor() {
        super();

        this.state = { shareValue: 0 }
    }

    onChange(e) {
        this.setState({ shareValue: e.target.value })

        if (this.props.onChange) {
            this.props.onChange({
                share: parseInt(e.target.value, 10)
            });
        }
    }

    render() {
        const { share } = this.props;

        return <div className="mdl-card app-feature-card-list-item share-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>Share strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give a percentage of users a feature.</i>
                <Slider min={0} max={100} defaultValue={share} onChange={this.onChange.bind(this)} />
                <span className="value">{this.state.shareValue || share}</span>
            </div>
        </div>
    }
}
