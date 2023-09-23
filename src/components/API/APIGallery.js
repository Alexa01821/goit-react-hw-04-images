import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38835015-a98c1366e41769307a118c04b';

export const searchPhoto = async (searchQuery, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      imageType: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return data;
};
