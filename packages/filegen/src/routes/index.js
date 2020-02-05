import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Route from './Route';

// import pages

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={() => <h1>Root Page</h1>} />
      <Route
        path="/home"
        exact
        component={() => <h1>Home Page</h1>}
        isPrivate
      />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
