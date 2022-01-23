/* eslint-disable max-len */
'use strict';

const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static';

const request = (url) => {
  return fetch(`${baseUrl}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(new Error(
            `${response.status} - ${response.statusText}`
          ));
        }, 5000);
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        Promise.reject(new Error(`content-type is not supported`));
      }

      return response.json();
    });
};

const getUser = () => request('/api/phones.json');

getUser()
  .then(result => {
    displayList(result);
  })
  .catch(error => error);

const displayList = (result) => {
  const ul = document.createElement('ul');

  for (const key of result) {
    const li = document.createElement('li');

    li.innerText = key.name;
    li.dataset.name = key.id;

    li.addEventListener('mouseup', (e) => {
      getPhonesDetails(e.target.dataset.name);
    });

    li.addEventListener('mouseover', (e) => {
      e.target.style.color = 'red';
      e.target.style.cursor = 'pointer';
    });

    li.addEventListener('mouseout', (e) => {
      e.target.style.color = '';
    });

    ul.appendChild(li);
  };

  document.body.append(ul);
};

const getPhonesDetails = (el) => {
  const details = () => request(`/api/phones/${el}.json`);

  details()
    .then(result => {
      showDatails(result);
    })
    .catch(error => error);

  function showDatails(itemDetails) {
    document.body.insertAdjacentHTML('beforeend', `
    <div style="
      display:flex;
      flex-direction:column;
      width:700px;
      height:auto;
      border: 1px solid #cbdcf7;
      border-radius:20px;
      background:cbdcf7;
      ">
      <h1>${itemDetails.name.toUpperCase()}</h1>
      <img
        style="min-height:300px"
        src="https://mate-academy.github.io/phone-catalogue-static/img/phones/${itemDetails.id}.0.jpg">
    <ul id="features">
      <li>${itemDetails.additionalFeatures}</li>
      <li>${itemDetails.description}</li>
    </ul>
  </div>
  `);
  };
};
