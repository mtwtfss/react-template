'use strict';

import React from 'react/addons';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import User from './views/User';
import Posts from './views/Posts';
import SinglePost from './views/Single';
import Settings from './views/Settings';
import NotFound from './views/404';

export default (
  <Router>
    <Route component={ App }>
      <Route name="404" path="/404" component={ NotFound } />
      <Route name="user" path="/user/:id" component={ User } />
      <Route name="post" path="/post/:id" component={ SinglePost } />
      <Route name="posts" path="/posts" component={ Posts } ignoreScrollBehavior />
      <Route name="settings" path="/settings" component={ Settings } ignoreScrollBehavior />
      <Redirect from="/" to="/posts" />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
);
