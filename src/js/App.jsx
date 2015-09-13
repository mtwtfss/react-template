'use strict';

import React from 'react/addons';
import Reflux from 'reflux';
import { Link } from 'react-router';

import Actions from './actions/Actions';

import CurrentUserStore from './stores/CurrentUserStore';
import ModalStore from './stores/ModalStore';

import Posts from './views/Posts';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import Success from './components/Success';
import NewPost from './components/NewPost';
import LoginLinks from './components/LoginLinks';
import UserSettings from './components/UserSettings';

let App = React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },

  mixins: [
    Reflux.listenTo(ModalStore, 'onModalUpdate'),
    Reflux.listenTo(CurrentUserStore, 'updateCurrentUser')
  ],

  getInitialState() {
    return {
      loading: true,
      modal: ModalStore.getDefaultData(),
      user: CurrentUserStore.getDefaultData()
    };
  },

  componentWillMount() {
    Actions.fetchUser();
    Actions.fetchUsers();
  },

  updateCurrentUser(user) {
    this.setState({
      user: user,
      loading: false,
      showModal: false
    });
  },

  onModalUpdate(newModalState) {
    this.setState({
      modal: newModalState
    });
  },

  hideModal(e) {
    if (e) { e.preventDefault(); }
    Actions.hideModal();
  },

  newPost() {
    if (this.state.user) {
      Actions.showModal('newpost');
    } else {
      Actions.showModal('login', { errorMessage: 'You have to login to do that' }, ['newpost']);
    }
  },

  getModalComponent(modal) {
    if (!modal.type) {
      return null;
    }

    let modalInner;
    let modalProps = {
      user: this.state.user,
      errorMessage: modal.errorMessage,
      successMessage: modal.successMessage
    };

    switch (modal.type) {
      case 'success':
        modalInner = <Success { ...modalProps } />; break;
      case 'register':
        modalInner = <Register { ...modalProps } />; break;
      case 'login':
        modalInner = <Login { ...modalProps } />; break;
      case 'newpost':
        modalInner = <NewPost { ...modalProps } />; break;
    }

    return (
      <Modal hideModal={ this.hideModal }>
        { modalInner }
      </Modal>
    );
  },

  render() {
    let { user, modal, loading } = this.state;

    return (
      <div className="wrapper full-height">
        <header className="header cf">
          <div className="float-left">
            <Link to="/" className="menu-title">React Template</Link>
          </div>
          <div className="float-right">
            { user ? <UserSettings user={ user } /> : (loading ? null : <LoginLinks />) }
            <a className="newpost-link" onClick={ this.newPost }>
              <i className="fa fa-plus-square-o"></i>
              <span className="sr-only">New Post</span>
            </a>
          </div>
        </header>

        <main id="content" className="full-height inner">
          { this.props.children || <Posts /> }
        </main>

        { this.getModalComponent(modal) }
      </div>
    );
  }
});

export default App;
