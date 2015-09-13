'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let post = null;

const SingleStore = Reflux.createStore({
  listenables: Actions,

  onFetchPost(postId) {
    var _this = this;
    API.fetchData('post/' + postId).then(function(postData) {
      post = postData.data;
      _this.trigger(post);
    }).fail(function() {
      post = {};
      _this.trigger(post);
    });
  },

  getDefaultData() {
    return post;
  }
});

export default SingleStore;
