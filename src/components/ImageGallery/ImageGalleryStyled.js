import styled from 'styled-components';

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: 1360px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  padding: 0;
  list-style: none;
  margin: 10 auto 10 auto;
`;