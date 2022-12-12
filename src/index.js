import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createPhotosHtml } from './js/image-create';
import scroll from './js/scroll';

const API = '31983214-2696166acee282192c021d74b';

const axios = require('axios').default;
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

const queryObj = {
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
  queryObj.setPage(1);
  queryObj.setQuery(query);
  getPictures(queryObj.returnUrl());
}

searchForm.addEventListener('submit', searchPictures);
buttonLoadMore.addEventListener('click', loadMore);

function loadMore() {
  queryObj.nextPage();
  getPictures(queryObj.returnUrl());
}

async function getPictures(url) {
  try {
    const response = await axios.get(url);
    const images = response.data.hits;
    // let totalPages = Math.ceil(totalHits / 40);

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    // if (totalPages <= page) {
    //   Notify.info("We're sorry, but you've reached the end of search results.");
    //   // buttonLoadMore.classList.add('block');
    // }
    if (queryObj.page === 1) {
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    }
    buttonLoadMoreState('block');
    gallery.insertAdjacentHTML('beforeend', createPhotosHtml(images));
    scroll();
    lightbox.refresh();
  } catch (error) {
    Notify.failure(error);
  }
}
