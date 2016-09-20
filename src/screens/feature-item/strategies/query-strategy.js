import React, { Component } from 'react';

import { Textfield } from 'react-mdl';

export default class QueryStrategy extends Component {
    onChange() {
        if (this.props.onChange) {
            this.props.onChange({
                key: this.keyEl.inputRef.value,
                values: this.valuesEl.inputRef.value.split(' ')
            });
        }
    }

    render() {
        const { key, values } = this.props;

        return <div className="mdl-card app-feature-card-list-item query-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>Query strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give user with a query parameter a feature.</i>
                <Textfield label="Key" defaultValue={key} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.keyEl = el} />
                <Textfield label="Values" defaultValue={(values || []).join(' ')} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.valuesEl = el} />
            </div>
        </div>
    }
}
