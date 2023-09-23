import { searchPhoto } from 'components/API/APIGallery';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

import { Component } from 'react';
import { Notify } from 'notiflix';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGalleryInfo extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    status: Status.IDLE,
    totalHits: null,
    result: null,
    largeImageURL: '',
    isShowModal: false,
    tagsModal: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const preSearchQuery = prevProps.searchQuery;
    const newSearchQuery = this.props.searchQuery;
    if (preSearchQuery !== newSearchQuery) {
      this.setState({ page: this.props.page });
    }
    if (preSearchQuery !== newSearchQuery || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      searchPhoto(newSearchQuery, page)
        .then(imagesArr =>
          this.setState({
            images:
              this.state.page === 1
                ? imagesArr.hits
                : [...prevState.images, ...imagesArr.hits],
            totalHits: imagesArr.totalHits,
            result: this.state.page * 12,
            status: Status.RESOLVED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  getMorePhoto = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, isShowModal: true, tagsModal: tags });
  };
  closeModal = () => {
    this.setState({ largeImageURL: '', isShowModal: false });
  };

  render() {
    const {
      images,
      error,
      status,
      result,
      totalHits,
      isShowModal,
      largeImageURL,
      tagsModal,
    } = this.state;
    if (status === 'idle') {
      return Notify.info('Enter your query in the search!');
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return Notify.failure(`Oops! ${error}`);
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery
            images={images}
            getMorePhoto={this.getMorePhoto}
            openModal={this.openModal}
          />

          {result < totalHits ? (
            <Button getMorePhoto={this.getMorePhoto} />
          ) : (
            Notify.info(
              "We're sorry, but you've reached the end of search results."
            )
          )}

          {isShowModal && (
            <Modal
              largeImageURL={largeImageURL}
              tags={tagsModal}
              closeModal={this.closeModal}
            />
          )}
        </>
      );
    }
  }
}
