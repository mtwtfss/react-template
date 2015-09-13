'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let users = {};

let usersHash = function(users) {
  var result = {};
  users.forEach(function(user) { result[user.id] = user; });
  return result;
};

const UsersStore = Reflux.createStore({
  listenables: Actions,

  onFetchUsers() {
    var _this = this;
    API.fetchData('users').then(function(users) {
      _this.trigger(usersHash(users.data));
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  getDefaultData() {
    return users;
  }
});

export default UsersStore;
