'use strict';

import React, { PropTypes } from 'react/addons';

const Modal = React.createClass({
  propTypes: {
    hideModal: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  },

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
  },

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  },

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  },

  render() {
    let { hideModal } = this.props;

    return (
      <div className="modal-overlay" onClick={ hideModal }>
        <div className="modal-inner" onClick={ (e) => e.stopPropagation() }>
          <a href="#" onClick={ hideModal } className="modal-close">
            <span className="fa fa-close"></span>
            <span className="sr-only">Hide Modal</span>
          </a>
          { this.props.children }
        </div>
      </div>
    );
  }
});

export default Modal;
