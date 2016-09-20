import React, { Component } from 'react';
import styles from './style.scss';

export default class Input extends Component {
    render() {
        const id = String(this.props.name).toLowerCase().replace(/([^0-9a-z-]+)/g);

        return (
            <div className={styles.radio}>
                {this.props.alternatives.map(alt => {
                    return <div className="form-input-radio-option">
                        <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={alt.id}>
                            <input {...alt} className="mdl-radio__button" type="radio" checked={alt.id === this.props.selected}/>
                            <span className="mdl-radio__label"> {alt.name}</span>
                        </label>
                    </div>
                })}
            </div>
        );
    }
}
