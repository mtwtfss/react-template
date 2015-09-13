'use strict';

module.exports = {
  fetchData: function(path) {
    return $.ajax({
      url: location.protocol + '//' + location.hostname + ':9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  postData: function(path, data) {
    return $.ajax({
      type: 'POST',
      data: data,
      url: location.protocol + '//' + location.hostname + ':9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  putData: function(path, data) {
    return $.ajax({
      type: 'PUT',
      data: data,
      url: location.protocol + '//' + location.hostname + ':9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  login: function(loginData) {
    return $.ajax({
      type: 'POST',
      data: { user: loginData },
      url: location.protocol + '//' + location.hostname + ':9292/login',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  logout: function(path) {
    return $.ajax({
      url: location.protocol + '//' + location.hostname + ':9292/logout',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  }
};
