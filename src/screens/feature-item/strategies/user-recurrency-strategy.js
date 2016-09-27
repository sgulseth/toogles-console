import React, { Component } from 'react';

import { Textfield } from 'react-mdl';

export default class UserRecurrencyStrategy extends Component {
    constructor() {
        super();

        this.state = { visitsValue: 0, visitInterval: 0 }

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({
            visits: parseInt(this.visitsEl.inputRef.value, 10),
            visitInterval: parseInt(this.visitIntervalEl.inputRef.value, 10)
        });

        if (this.props.onChange) {
            this.props.onChange({
                visits: parseInt(this.visitsEl.inputRef.value, 10),
                visitInterval: parseInt(this.visitIntervalEl.inputRef.value, 10)
            });
        }
    }

    render() {
        const { visits, visitInterval } = this.props;

        return <div className="mdl-card app-feature-card-list-item user-recurrency-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>User Recurrency strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give frequent visitors a feature.</i>
                <Textfield label="Visits" defaultValue={visits} floatingLabel onChange={this.onChange} ref={el => this.visitsEl = el} />
                <Textfield label="Visit interval(seconds)" defaultValue={visitInterval} floatingLabel onChange={this.onChange} ref={el => this.visitIntervalEl = el} />
            </div>
        </div>
    }
}
