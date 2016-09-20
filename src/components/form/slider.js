import React, { Component } from 'react';
import { omit } from 'lodash';
import styles from './style.scss';

export default class Input extends Component {
    render() {
        const id = String(this.props.name).toLowerCase().replace(/([^0-9a-z-]+)/g);
        const inputAttrs = Object.assign({}, {
            min: 0,
            max: 100,
            value: 0,
            tabindex: 0
        }, omit(this.props, ['name']), { type: 'range' });

        return (
            <div className={styles.slider}>
                <input {...inputAttrs} id={id} className="mdl-slider mdl-js-slider" />
                <span className="value">{this.props.value}</span>
            </div>
        );
    }
}
