export function createPhotosHtml(imagesArr) {
  return imagesArr
    .map(image => {
      return `
<div class="photo-card">
  <a class="image-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}"  loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="count">${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="count">${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="count">${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="count">${image.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
}
