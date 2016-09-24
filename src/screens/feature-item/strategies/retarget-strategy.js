import React, { Component } from 'react';
import { uniq } from 'lodash';

import { Textfield } from 'react-mdl';

export default class RetargetStrategy extends Component {
    constructor() {
        super();
        this.featureIdsEls = [];
        this.state = { featureIds: [] }
    }

    onChange() {
        if (this.props.onChange) {
            const featureIds = uniq([...this.featureIdsEls.map(el => {
                return el.inputRef.value
            }), ...this.state.featureIds]);

            this.props.onChange({ featureIds });
        }
    }

    add() {
        const featureIds = this.state.featureIds;
        featureIds.push(this.addEl.inputRef.value);
        this.addEl.inputRef.value = '';

        this.setState({ featureIds })

        this.onChange();
    }

    render() {
        const featureIds = [...(this.props.featureIds || []), ...this.state.featureIds];

        return <div className="mdl-card app-feature-card-list-item header-strategy">
            <div className="mdl-card__title mdl-card--expand">
                <h4>Retarget strategy</h4>
            </div>
            <div className="mdl-card__supporting-text">
                <i>Give user who has already seen a feature, another feature.</i>
                {featureIds.map((featureIds, i) => {
                    return (
                        <Textfield key={i} label="Feature ID"
                            defaultValue={featureIds} floatingLabel
                            onChange={this.onChange.bind(this)}
                            ref={el => this.featureIdsEls[i] = el}
                        />
                    );
                })}
                <Textfield label="Feature ID" floatingLabel ref={el => this.addEl = el} />
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => this.add()}>Add</button>
            </div>
        </div>
    }
}
