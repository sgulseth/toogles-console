import React from 'react';
import { IndexLink, Link } from 'react-router';

export default () => (
    <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
            <IndexLink to="/" className="mdl-navigation__link">
                <span className="mdl-layout-title">Toogles</span>
            </IndexLink>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
                <IndexLink to="/" className="mdl-navigation__link">Features</IndexLink>
            </nav>
        </div>
    </header>
);
