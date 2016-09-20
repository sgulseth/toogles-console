import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../screens/app';
import FeatureList from '../screens/feature-list';
import FeatureItem from '../screens/feature-item';

export default () => (
  <Route component={ App }>
    <IndexRoute component={ FeatureList } />
    <Route path="/feature" component={ FeatureItem } />
    <Route path="/feature/:id" component={ FeatureItem } />
  </Route>
);
