'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { History } from 'react-router';

import SingleStore from '../stores/SingleStore';
import UsersStore from '../stores/UsersStore';
import Spinner from '../components/Spinner';
import Post from '../components/Post';

const SinglePost = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    History,
    Reflux.listenTo(SingleStore, 'updatePost'),
    Reflux.listenTo(UsersStore, 'updateUsers')
  ],

  getInitialState() {
    return {
      loading: true,
      post: SingleStore.getDefaultData(),
      users: UsersStore.getDefaultData()
    };
  },

  componentDidMount() {
    let { id } = this.props.params;
    Actions.fetchUsers();
    Actions.fetchPost(id);
  },

  updatePost(post) {
    if (!post.id) {
      this.history.pushState(null, '/404');
      return;
    }

    this.setState({ post: post, loading: false, users: this.state.users });
  },

  updateUsers(users) {
    this.setState({ users: users, post: this.state.post, loading: this.state.loading });
  },

  render() {
    let content;
    let { id } = this.props.params;
    let { post, users, loading } = this.state;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <Post post={ post } user={ users[post.user_id] }key={ id } />
        </div>
      );
    }

    return (
      <div className="content full-width">
        { content }
      </div>
    );
  }
});

export default SinglePost;
