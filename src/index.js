import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createPhotosHtml } from './js/image-create';
import { scroll } from './js/scroll';

const API = '31983214-2696166acee282192c021d74b';

const axios = require('axios').default;
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const lightboxGallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

const fetchImages = {
  perPage: 40,
  query: '',
  page: 1,
  returnUrl() {
    return `https://pixabay.com/api/?key=${API}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
  },
  nextPage() {
    this.page += 1;
  },
  setQuery(query) {
    this.query = query;
  },
  setPage(page) {
    this.page = page;
  },
};

function clearGallery() {
  gallery.innerHTML = '';
}

function buttonLoadMoreState(param) {
  buttonLoadMore.style.display = param;
}

function searchPictures(event) {
  buttonLoadMoreState('none');
  clearGallery();
  event.preventDefault();
  const query = event.target.searchQuery.value.trim();
  if (query === '') {
    return;
  }
  fetchImages.setPage(1);
  fetchImages.setQuery(query);
  getPictures(fetchImages.returnUrl());
}

searchForm.addEventListener('submit', searchPictures);
buttonLoadMore.addEventListener('click', loadMore);

function loadMore() {
  fetchImages.nextPage();
  getPictures(fetchImages.returnUrl());
}

async function getPictures(url) {
  try {
    const response = await axios.get(url);
    const images = response.data.hits;

    // delete load more
    let totalPages = Math.ceil(response.data.totalHits / 40);
    if (images.length <= totalPages) {
      buttonLoadMoreState('none');
      return;
    }

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (fetchImages.page === 1) {
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
      buttonLoadMoreState('block');
    }
    gallery.insertAdjacentHTML('beforeend', createPhotosHtml(images));
    scroll();
    lightboxGallery.refresh();
  } catch (error) {
    Notify.failure(error);
  }
}
