'use strict';

import Reflux from 'reflux';
import API from '../util/api';

const Actions = Reflux.createActions([
  // user actions
  'login',
  'logout',
  'register',
  'fetchUser',
  'fetchUsers',
  'updateUser',
  'changePassword',
  // post actions
  'fetchPost',
  'fetchPosts',
  'submitPost',
  'expandPostRange',
  // modal actions
  'showModal',
  'hideModal',
  'nextModal',
  'modalError'
]);

export default Actions;
