'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let currentUser = null;

const CurrentUserStore = Reflux.createStore({
  listenables: Actions,

  onFetchUser() {
    var _this = this;
    API.fetchData('user').then(function(user) {
      _this.trigger(user.data);
    }).fail(function(error) {
      _this.trigger(null);
      Actions.modalError(error.responseText);
    });
  },

  onUpdateUser(user) {
    this.trigger(user.data);
  },

  onRegister(loginData) {
    var _this = this;
    API.postData('user', loginData).then(function(user) {
      _this.trigger(user.data);
      Actions.nextModal();
    }).fail(function(error) {
      Actions.modalError(error.responseJSON.errors[0]);
    });
  },

  onLogin(loginData) {
    var _this = this;
    API.login(loginData).then(function(user) {
      _this.trigger(user.data);
      Actions.nextModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onLogout() {
    var _this = this;
    API.logout().then(function() {
      _this.trigger(null);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  getDefaultData() {
    return currentUser;
  }
});

export default CurrentUserStore;
