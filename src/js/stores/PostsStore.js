'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let postRangeStep = 10;

let data = {
  posts: [],
  postRange: 10
};

const PostsStore = Reflux.createStore({
  listenables: Actions,

  onFetchPosts() {
    var _this = this;
    API.fetchData('posts').then(function(postsData) {
      data.posts = postsData.data;
      _this.trigger(data);
    }).fail(function() {
      window.alert('Unable to fetch post data');
    });
  },

  onSubmitPost(postData) {
    var _this = this;
    API.postData('post', postData).then(function(post) {
      data.posts.unshift(post.data);
      _this.trigger(data);
      Actions.hideModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onExpandPostRange() {
    data.postRange = data.postRange + postRangeStep;
    this.trigger(data);
  },

  getDefaultData() {
    return data;
  }
});

export default PostsStore;
