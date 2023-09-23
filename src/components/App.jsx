import { Container } from './AppStyled';
import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGalleryInfo } from './ImageGalleryInfo/ImageGalleryInfo';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  searchImages = value => {
    this.setState({
      searchQuery: value,
      page: 1,
    });
  };

  render() {
    return (
      <Container>
        <SearchBar searchImages={this.searchImages} />
        <main className='main'>
          <ImageGalleryInfo searchQuery={this.state.searchQuery} page={this.state.page} />
        </main>
      </Container>
    );
  }
}
