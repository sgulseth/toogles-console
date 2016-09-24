import React, { Component } from 'react';
import { uniq } from 'lodash';

import { Textfield } from 'react-mdl';

export default class RefererStrategy extends Component {
    constructor() {
        super();
        this.refererEls = [];
        this.state = { referers: [] }
    }

    onChange() {
        if (this.props.onChange) {
            const referers = uniq([...this.refererEls.map(el => {
                return el.inputRef.value
            }), ...this.state.referers]);

            this.props.onChange({ referers });
        }
    }

    add() {
        const referers = this.state.referers;
        referers.push(this.addEl.inputRef.value);
        this.addEl.inputRef.value = '';

        this.setState({ referers })

        this.onChange();
    }

    render() {
        const referers = [...(this.props.referers || []), ...this.state.referers];

        return <div className="mdl-card app-feature-card-list-item header-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>Referer strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give user with a http referer a feature.</i>
                {referers.map((referer, i) => {
                    return (
                        <Textfield key={i} label="Referer"
                            defaultValue={referer} floatingLabel
                            onChange={this.onChange.bind(this)}
                            ref={el => this.refererEls[i] = el}
                        />
                    );
                })}
                <Textfield label="Referer" floatingLabel ref={el => this.addEl = el} />
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => this.add()}>Add</button>
            </div>
        </div>
    }
}
