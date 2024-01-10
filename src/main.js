import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.form');
const imagesGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const BASE_URL = "https://pixabay.com/api/?";
const API_KEY = "41732338-ca5909782120305119b6393dc";

const searchParamsDefault = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  enableKeyboard: true,
  docClose: true,
});

form.addEventListener('submit', event => {
  event.preventDefault();
  loader.style.display = 'block';
searchParamsDefault.q = event.target.elements.search.value;
const searchParams = new URLSearchParams(searchParamsDefault);
getImages(searchParams);
event.currentTarget.reset();    
});

const getImages = (params) => {
    return fetch(BASE_URL + `${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Something went wrong. Please try again later.`)
            } 
            return response.json();
        })
       .then(({ hits }) => {
            if (hits.length === 0) {
                iziToast.error({
                    position: 'topRight',
                    messageColor: '#FFFFFF',
                    backgroundColor: '#EF4040',
                    titleSize: '8px',
                    closeOnEscape: true,
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                imagesGallery.innerHTML = hits.reduce((html, image) => html + `
                    <li class="gallery-item">
                        <a href=${image.largeImageURL}> 
                            <img class="gallery-img" src=${image.webformatURL} alt=${image.tags}/>
                        </a>
                        <div class="gallery-text-box">
                            <p>Likes: <span class="text-value">${image.likes}</span></p>
                            <p>Views: <span class="text-value">${image.views}</span></p>
                            <p>Comments: <span class="text-value">${image.comments}</span></p>
                            <p>Downloads: <span class="text-value">${image.downloads}</span></p>
                        </div>
                    </li>
                `, "");
                lightbox.refresh();
            }
        })
    
        .catch(error => {
        console.error(error.message);
        })
        .finally(() => {
            loader.style.display = 'none';
        })
    
}