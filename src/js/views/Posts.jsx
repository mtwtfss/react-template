'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';

import PostsStore from '../stores/PostsStore';
import UsersStore from '../stores/UsersStore';
import Spinner from '../components/Spinner';
import Post from '../components/Post';

const Posts = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.listenTo(PostsStore, 'updatePosts'),
    Reflux.listenTo(UsersStore, 'updateUsers')
  ],

  getInitialState() {
    let postData = PostsStore.getDefaultData();

    return {
      loading: true,
      posts: postData.posts,
      postRange: postData.postRange,
      users: UsersStore.getDefaultData()
    };
  },

  componentDidMount() {
    Actions.fetchPosts();
    Actions.fetchUsers();
  },

  updatePosts(postData) {
    this.setState({
      loading: false,
      posts: postData.posts,
      users: this.state.users,
      postRange: postData.postRange
    });
  },

  updateUsers(users) {
    this.setState({
      users: users,
      posts: this.state.posts,
      loading: this.state.loading,
      postRange: this.state.postData
    });
  },

  loadMorePosts() {
    Actions.expandPostRange();
  },

  render() {
    let posts = this.state.posts;
    let users = this.state.users;
    let postRange = this.state.postRange;

    if (posts.length) {
      posts = posts.slice(0, postRange).map(function(post) {
        return <Post post={ post } user={ users[post.user_id] } key={ post.id } />;
      });
    } else {
      posts = 'There are no posts yet!';
    }

    return (
      <div className="content full-width">
        <div className="posts">
          { this.state.loading ? <Spinner /> : posts }
        </div>
        {
          this.state.posts.length > this.state.postRange ? (
            <nav className="pagination">
              <hr />
              <a onClick={ this.loadMorePosts } className="load-more">Load More Posts</a>
            </nav>
          ) : null
        }
      </div>
    );
  }
});

export default Posts;
