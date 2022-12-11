// import axios from 'axios';

// // const API_KEY = '31983214-2696166acee282192c021d74b';
// // const URL = 'https://pixabay.com/api';

// export class API {
//   constructor(query) {
//     this.URL = 'https://pixabay.com/api/';
//     this.API_KEY = '31983214-2696166acee282192c021d74b';
//     this.query = query;
//     this.page = 1;
//   }

//   async getPhotos() {
//     const promise = await axios.get(
//       `${this.URL}?key=${this.API_KEY}&q=${this.query}&image_type=photo&safesearch=true&orientation=horizontal&page=${this.page}&per_page=40`
//     );
//     return promise;
//   }

//   pageIncrement() {
//     this.page += 1;
//   }
// }
