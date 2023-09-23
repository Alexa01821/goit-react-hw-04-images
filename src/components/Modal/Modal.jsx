import React, { Component } from 'react';
import { Overlay } from './ModalStyled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByEsc = ({ code }) => {
    if (code === 'Escape') this.props.closeModal();
  };

  closeModalClick = ({ target, currentTarget }) => {
    if (target === currentTarget) this.props.closeModal();
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <Overlay onClick={this.closeModalClick}>
        <img className="modal" src={largeImageURL} alt={tags} />
      </Overlay>
    );
  }
}
