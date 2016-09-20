import React, { Component } from 'react';

import { Textfield } from 'react-mdl';

export default class QueryStrategy extends Component {
    onChange() {
        if (this.props.onChange) {
            this.props.onChange({
                first: parseInt(this.firstEl.inputRef.value, 10)
            });
        }
    }

    render() {
        const { first } = this.props;

        return <div className="mdl-card app-feature-card-list-item first-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>First strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give the first X users the feature.</i>
                <Textfield label="First" defaultValue={first} floatingLabel onChange={this.onChange.bind(this)} ref={el => this.firstEl = el} />
            </div>
        </div>
    }
}
