import { useState } from 'react';
import { Notify } from 'notiflix';

import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryInfo = ({ params, getMorePhoto }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const { status, error, showBtn, images } = params;

  const openModal = dataModal => {
    setDataModal(dataModal);
    setShowModal(true);
  };

  const closeModal = () => {
    setDataModal(null);
    setShowModal(false);
  };

  return (
    <>
      {images && images.length > 0 && (
        <ImageGallery
          images={images}
          getMorePhoto={getMorePhoto}
          openModal={openModal}
        />
      )}
      {status && <Loader />}

      {error && Notify.failure(`Oops! ${error}`)}

      {showBtn ? (
        <Button getMorePhoto={getMorePhoto} />
      ) : (
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        )
      )}

      {showModal && <Modal dataModal={dataModal} closeModal={closeModal} />}
    </>
  );
};
