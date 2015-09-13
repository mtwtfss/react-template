'use strict';

import React from 'react/addons';
import Actions from '../actions/Actions';
import { Link } from 'react-router';

const UserSettings = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState() {
    return {
      displayUserMenu: false
    };
  },

  logout() {
    Actions.logout();
  },

  toggleUserMenu() {
    if (this.state.displayUserMenu) {
      document.removeEventListener('keyup', this.onKeyUp);
    } else {
      document.addEventListener('keyup', this.onKeyUp);
    }

    this.setState({ displayUserMenu: !this.state.displayUserMenu });
  },

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.toggleUserMenu();
    }
  },

  userMenu() {
    return (
      <span className="user-dropdown">
        <Link to={ `/settings` }>Settings</Link>
        <div onClick={ this.logout }>Logout</div>
      </span>
    );
  },

  render() {
    return (
      <a onClick={ this.toggleUserMenu }>
        { this.props.user.username }
        <span className="dropdown-caret"></span>
        { this.state.displayUserMenu ? this.userMenu() : null }
      </a>
    );
  }
});

export default UserSettings;
