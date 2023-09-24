import { useEffect } from 'react';
import { Overlay } from './ModalStyled';

export const Modal = ({ dataModal, closeModal }) => {
  useEffect(() => {
    const closeModalByEsc = ({ code }) => {
      if (code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', closeModalByEsc);
    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModal]);

  const closeModalClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeModal();
  };

  const { largeImageURL, tags } = dataModal;
  return (
    <Overlay onClick={closeModalClick}>
      <img className="modal" src={largeImageURL} alt={tags} />
    </Overlay>
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModalByEsc);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModalByEsc);
//   }

//   closeModalByEsc = ({ code }) => {
//     if (code === 'Escape') this.props.closeModal();
//   };

//   closeModalClick = ({ target, currentTarget }) => {
//     if (target === currentTarget) this.props.closeModal();
//   };
//   render() {
//     const { largeImageURL, tags } = this.props;
//     return (
//       <Overlay onClick={this.closeModalClick}>
//         <img className="modal" src={largeImageURL} alt={tags} />
//       </Overlay>
//     );
//   }
// }
