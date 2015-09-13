'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

import Actions from '../actions/Actions';

import abbreviateNumber from '../util/abbreviateNumber';
import pluralize from '../util/pluralize';
import hostNameFromUrl from '../util/hostNameFromUrl';
import timeAgo from '../util/timeAgo';

const Post = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    post: React.PropTypes.object
  },

  render() {
    let user = this.props.user;
    let post = this.props.post;

    return (
      <div className="post">
        <div className="post-link">
          <Link className="post-title" to={ `/post/${post.id}` }>{ post.title }</Link>
          <span className="hostname">
            (<a href={ post.url }>{ hostNameFromUrl(post.url) }</a>)
          </span>
        </div>
        <div className="post-info">
          <div className="posted-by">
            <span className="post-info-item">
              <Link to={ `/user/${post.user_id}` }>{ user ? user.username : `User ${post.user_id}` }</Link>
            </span>
            <span className="post-info-item">
              { timeAgo(post.created_at) }
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default Post;
