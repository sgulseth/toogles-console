import React, { Component } from 'react';

import { Textfield } from 'react-mdl';

export default class QueryStrategy extends Component {
    onChange() {
        if (this.props.onChange) {
            this.props.onChange({
                header: this.headerEl.inputRef.value,
                values: this.valuesEl.inputRef.value.split(' ')
            });
        }
    }

    render() {
        const { header, values } = this.props;

        return <div className="mdl-card app-feature-card-list-item header-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>Header strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give user with a request header a feature.</i>
                <Textfield label="Header" defaultValue={header} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.headerEl = el} />
                <Textfield label="Values" defaultValue={(values || []).join(' ')} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.valuesEl = el} />
            </div>
        </div>
    }
}
