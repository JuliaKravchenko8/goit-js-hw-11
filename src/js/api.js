import axios from 'axios';

const API_KEY = '31983214-2696166acee282192c021d74b';
const URL = 'https://pixabay.com/api';

export class API {
  constructor(query) {
    this.query = query;
    this.page = 1;
    this.perPage = 40;
    this.axios = require('axios');
  }

  async getPhotos() {
    const promise = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.query}&image_type=photo&safesearch=true&orientation=horizontal&page=${this.page}&per_page=$(this.perPage)`
    );
    return promise;
  }

  pageIncrement() {
    this.page += 1;
  }
}
