import { GalleryItemElement } from './ImageGalleryItemStyled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <GalleryItemElement key={id} onClick={() => openModal(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </GalleryItemElement>
  );
};
