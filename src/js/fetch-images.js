export const fetchImages = {
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
