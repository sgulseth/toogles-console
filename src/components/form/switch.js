import React, { Component } from 'react';
import { omit } from 'lodash';
import styles from './style.scss';

export default class Input extends Component {
    render() {
        const id = String(this.props.name).toLowerCase().replace(/([^0-9a-z-]+)/g);
        const inputAttrs = Object.assign({ id: id }, omit(this.props, ['name']));

        return (
            <div className={styles.switch}>
                <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id}>
                    <input {...inputAttrs} type="checkbox" id={id} className="mdl-switch__input" />
                    <span className="mdl-switch__label">{this.props.name}</span>
                </label>
            </div>
        );
    }
}
