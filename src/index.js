import {flikrUrl, mediaStack_apiUrl} from './config'
import './styles.scss';

  const newsTypeEl = document.querySelectorAll('.newsType');
  const searchFormEl = document.getElementsByClassName('search')[0]
  searchFormEl.onsubmit = getSearch

  function loading (isLoad = true) {
    const loader = document.querySelector('.loader');
    const backLoader = document.querySelector('.backLoader');
    if (isLoad) {
      backLoader.classList.remove('hide-loader');
      loader.classList.remove('hide-loader');
      backLoader.classList.add('show-loader');
      loader.classList.add('show-loader');
    }
    if (!isLoad) {
      backLoader.classList.remove('show-loader');
      loader.classList.remove('show-loader');  
      backLoader.classList.add('hide-loader');
      loader.classList.add('hide-loader');
    }
  }

  function showNews(data) { 
    var result = document.querySelector(".result");
    data.map(detail => {
      const subResult = document.createElement("subResult");
      const image = detail.image ? `<img src=${detail.image}>` : '';
        subResult.innerHTML = `
          <div id="newsResult">
            <p>${detail.source}</p>
            <a href="${detail.url}" target="_blank">${detail.title}</a>
            <p class="description"> -- ${detail.description}</p>
            ${image}
            <h6>pubished at : ${detail.published_at}</h6>
          </div>
          <hr>
        `;
        result.appendChild(subResult);
    });
  }

  newsTypeEl.forEach(el => el.onclick = () => getRelatedNews(el.dataset.type))
  function getRelatedNews(category) {
    loading(true);
    var inputEl = document.querySelector('input');
    var result = document.querySelector(".result");
    inputEl.value="";
    result.innerHTML = "";
    var url = mediaStack_apiUrl + 'categories=' + category ;
    var req = new Request(url);
    fetch(req)
      .then((response) => {
        loading(false);
        if(response.status === 200){
          var data = response.json();
        } else {
          return console.log('Something error')
        };
        data.then(results => {
          showNews(results.data);
        }).catch(err => console.error('Error ', err));
      })
      .catch(err => console.error('Error ', err));
  }
  
  function getSearch() {
    loading(true);
    event.preventDefault();
    var query = event.target.query.value;
    var result = document.querySelector(".result");
    result.innerHTML = "";
    getPicture(query);
  }
  
  function getPicture(query) {
    const url = flikrUrl + query;
    const req = new Request(url);
    fetch(req)
      .then((response) => {
        loading(false);
        if(response.status === 200) {
          var dataF = response.json();
        } else {
          return console.log('Something error')
        };
        dataF.then(firstPic => {
          var result = document.querySelector(".result");
          var photo = firstPic.photos.photo[0];
          var picResult = document.createElement("picResult");
          picResult.innerHTML = `
            <div id="flikrResult">
            <h6>This image received based on your searched keyword <br> from FLIKR website</p>
            <img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg">
            </div>
          `;
          result.appendChild(picResult);
          getPictureNews(query);
        })
        .catch(err => console.error('Error ', err));
      })
      .catch(err => console.error('Error ', err));
  }
  
  function getPictureNews(query) {
    var url = mediaStack_apiUrl + 'keywords=' + query
    var req = new Request(url);
    fetch(req)
      .then(function(response) {
        if(response.status === 200){
        var data = response.json();}
        else {
          return console.log('Something error')
        };
        data.then( results => {
          showNews(results.data);
        }
      ).catch(err => console.error('Error ', err));
    }).catch(err => console.error('Error ', err));
  }
  