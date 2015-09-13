'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { History } from 'react-router';

import API from '../util/api';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';
import CurrentUserStore from '../stores/CurrentUserStore';

const Settings = React.createClass({
  mixins: [
    History,
    Reflux.listenTo(CurrentUserStore, 'updateCurrentUser')
  ],

  getInitialState() {
    return {
      user: null,
      passwordError: null,
      currentPassword1: null,
      currentPassword2: null,
      newUsername: null,
      newPassword: null,
      retypedPassword: null
    };
  },

  componentWillMount() {
    Actions.fetchUser();
  },

  updateCurrentUser(user) {
    if (!user) {
      this.history.pushState(null, '/posts');
      return;
    }

    this.setState({ user: user });
  },

  changeUsername(e) {
    e.preventDefault();

    var _this = this;

    var userData = {
      username: this.state.newUsername,
      currentPassword: this.state.currentPassword1
    };

    API.putData('user/' + this.state.user.id, userData).then(function(result) {
      _this.setState({
        newUsername: null,
        currentPassword1: null
      });
      Actions.updateUser(result);
      Actions.showModal('success', { successMessage: 'You have changed your username to ' + result.data.username });
    }).fail(function(error) {
      var errorText = error.status === 403 ? 'Incorrect password' : error.responseJSON.errors[0];
      _this.setState({ usernameError: errorText });
    });
  },

  changePassword(e) {
    e.preventDefault();

    var _this = this;

    if (this.state.newPassword !== this.state.retypedPassword) {
      this.setState({ passwordError: 'Passwords do not match' });
      return;
    }

    var userData = {
      password: this.state.newPassword,
      passwordConfirmation: this.state.retypedPassword,
      currentPassword: this.state.currentPassword2
    };

    API.putData('user/' + this.state.user.id, userData).then(function() {
      _this.setState({
        newPassword: null,
        retypedPassword: null,
        currentPassword2: null
      });
      Actions.showModal('success', { successMessage: 'You have successfully changed your password' });
    }).fail(function(error) {
      var errorText = error.status === 403 ? 'Incorrect password' : error.responseJSON.errors[0];
      _this.setState({ passwordError: errorText });
    });
  },

  render() {
    let {
      newUsername,
      usernameError,
      newPassword,
      retypedPassword,
      passwordError,
      currentPassword1,
      currentPassword2
    } = this.state;

    return (
      <div className="content full-width">
        <h2>Change Username</h2>
        <form onSubmit={ this.changeUsername } className="form">
          <table className="settings-table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="current-password">Current password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="current-password"
                    value={ currentPassword1 }
                    onChange={ (e) => this.setState({ usernameError: null, currentPassword1: e.target.value }) }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="new-username">New username</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="new-username"
                    value={ newUsername }
                    onChange={ (e) => this.setState({ usernameError: null, newUsername: e.target.value }) }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="button button-primary">Change Username</button>
          <span className="error settings-error">{ usernameError }</span>
        </form>
        <h2>Change Password</h2>
        <form onSubmit={ this.changePassword } className="form">
          <table className="settings-table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="current-password">Current password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="current-password"
                    value={ currentPassword2 }
                    onChange={ (e) => this.setState({ passwordError: null, currentPassword2: e.target.value }) }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="new-password">New password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="new-password"
                    value={ newPassword }
                    onChange={ (e) => this.setState({ passwordError: null, newPassword: e.target.value }) }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="retype-password">Re-type password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="retype-password"
                    value={ retypedPassword }
                    onChange={ (e) => this.setState({ passwordError: null, retypedPassword: e.target.value }) }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="button button-primary">Change Password</button>
          <span className="error settings-error">{ passwordError }</span>
        </form>
      </div>
    );
  }
});

export default Settings;
