import { Container } from './AppStyled';
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGalleryInfo } from './ImageGalleryInfo/ImageGalleryInfo';
import { searchPhoto } from './API/APIGallery';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  const getNormalizedPhoto = hits => {
    return hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return { id, webformatURL, largeImageURL, tags };
    });
  };

  const getImages = useCallback(async () => {
    setStatus(true);
    try {
      const { hits, totalHits } = await searchPhoto(searchQuery, page);
      setImages(prevImage => [...prevImage, ...getNormalizedPhoto(hits)]);
      setShowBtn(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error);
    } finally {
      setStatus(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    if (searchQuery) getImages();
  }, [searchQuery, getImages]);

  const searchImages = value => {
    setSearchQuery(value);
    setPage(1);
    setImages([]);
  };
  const getMorePhoto = () => {
    setPage(prePage => prePage + 1);
  };
  return (
    <Container>
      <SearchBar searchImages={searchImages} />
      <main className="main">
        <ImageGalleryInfo
          params={{ status, error, showBtn, images }}
          getMorePhoto={getMorePhoto}
        />
      </main>
    </Container>
  );
};
