import React, { Component } from 'react';
import { omit } from 'lodash';
import styles from './style.scss';

export default class Input extends Component {
    render() {
        const id = String(this.props.name).toLowerCase().replace(/([^0-9a-z-]+)/g);
        const inputAttrs = Object.assign({ id: id, className: 'mdl-checkbox__input', type: 'checkbox' }, omit(this.props, ['name']));

        return (
            <div className={styles.checkbox}>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                    <input {...inputAttrs} />
                    <span className="mdl-checkbox__label">{this.props.name}</span>
                </label>
            </div>
        );
    }
}
