'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { History } from 'react-router';

import PostsStore from '../stores/PostsStore';
import UsersStore from '../stores/UsersStore';
import Spinner from '../components/Spinner';
import User from '../components/User';

const UserPage = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    History,
    Reflux.listenTo(PostsStore, 'updatePosts'),
    Reflux.listenTo(UsersStore, 'updateUsers')
  ],

  getInitialState() {
    return {
      loading: true,
      userID: this.props.params.id
    };
  },

  componentWillMount() {
    Actions.fetchUsers();
    Actions.fetchPosts();
  },

  updatePosts(postData) {
    var userID = parseInt(this.state.userID);
    var posts = postData.posts.filter(function(post) { return post.user_id === userID; });

    this.setState({
      posts: posts,
      user: this.state.user,
      userID: this.state.userID,
      loading: !this.state.user
    });
  },

  updateUsers(users) {
    var user = users[this.state.userID];

    if (!user) {
      this.history.pushState(null, '/404');
      return;
    }

    this.setState({
      posts: this.state.posts,
      userID: this.state.userID,
      loading: !this.state.posts,
      user: users[this.state.userID]
    });
  },

  render() {
    let { user, posts } = this.state;

    return (
      <div className="content full-width">
        <div className="users">
          { this.state.loading ? <Spinner /> : <User user={ user } posts={ posts } /> }
        </div>
      </div>
    );
  }
});

export default UserPage;
