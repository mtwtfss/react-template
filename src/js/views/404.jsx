'use strict';

import React from 'react/addons';

// components
const Link = require('react-router').Link;

const NotFound = React.createClass({
  render() {
    return (
      <div className="content full-width">
        <h1>{ 'That Page Doesn\'t Exist' }</h1>
        <Link to="/">Return to the homepage</Link>
      </div>
    );
  }
});

export default NotFound;
