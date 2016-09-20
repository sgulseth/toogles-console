import React, { Component } from 'react';

import { Textfield } from 'react-mdl';

export default class IPStrategy extends Component {
    onChange() {
        if (this.props.onChange) {
            this.props.onChange({
                ips: this.ipsEl.inputRef.value.split(' ')
            });
        }
    }

    render() {
        const { ips } = this.props;

        return <div className="mdl-card app-feature-card-list-item ip-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>IP strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give user with a specific IP a feature.</i>
                <Textfield label="Values" defaultValue={(ips || []).join(' ')} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.ipsEl = el} />
            </div>
        </div>
    }
}
