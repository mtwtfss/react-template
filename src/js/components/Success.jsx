'use strict';

import React, { PropTypes } from 'react/addons';
import Actions from '../actions/Actions';

const Success = React.createClass({
  propTypes: {
    successMessage: PropTypes.string
  },

  render() {
    return (
      <div className="success">
        <h1>Success</h1>
        <div>{ this.props.successMessage }</div>
        <button onClick={ Actions.hideModal } className="button button-primary">Ok</button>
      </div>
    );
  }
});

export default Success;
