'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

import Post from './Post';

const User = React.createClass({
  propTypes: {
    posts: React.PropTypes.array,
    user: React.PropTypes.object
  },

  render() {
    let user = this.props.user;
    let posts = this.props.posts.map(function(post) {
      return <Post post={ post } user={ user } key={ post.id } />;
    });

    return (
      <div className="user">
        <h1>{ user.username }&#39;s posts:</h1>
        <div className="posts">
          { posts }
        </div>
      </div>
    );
  }
});

export default User;
