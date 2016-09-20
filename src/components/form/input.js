import React, { Component } from 'react';
import { omit } from 'lodash';
import styles from './style.scss';

export default class Input extends Component {
    componentDidMount() {
        if (window.componentHandler && this.el) {
            window.componentHandler.upgradeElements(this.el)
        }
    }

    render() {
        const id = String(this.props.name).toLowerCase().replace(/([^0-9a-z-]+)/g);
        const inputAttrs = Object.assign({ type: 'text' }, omit(this.props, 'name'));

        return (
            <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${styles.input}`} refs={el => this.el = el}>
                <input {...inputAttrs} id={id} className="mdl-textfield__input" />
                <label className="mdl-textfield__label" htmlFor={id}>{this.props.name}</label>
                <span className="mdl-textfield__error">{(this.props.errorMessage || '') + ' ' + inputAttrs.pattern}</span>
            </div>
        );
    }
}
