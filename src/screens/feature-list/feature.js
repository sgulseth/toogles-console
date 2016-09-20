import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './style.scss';

export default class Feature extends Component {
    render() {
        const { feature } = this.props;
        return (
            <div className={`mdl-card mdl-shadow--2dp ${styles.featureListItem}`}>
                <div className="mdl-card__title mdl-card--expand">
                    <h4 className="mdl-card__title-text">{feature.name}</h4>
                </div>
                <div className="mdl-card__supporting-text">
                    <p className={styles.featureListItemDescription}>{feature.description || 'No description'}</p>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <Link className="mdl-button mdl-button--colored.mdl-js-button mdl-js-ripple-effect" to={`/feature/${feature.id}`}>Edit</Link>
                </div>
            </div>
        );
    }
}
