'use strict';

const BASE_URL = `https://
mate-academy.github.io/phone-catalogue-static/api/phones`;

const phonesId = document.querySelector('#phones');

const request = url => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        );
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(
          new Error('Content-type is not supported')
        );
      }

      return response.json();
    });
};

const getPhonesDetails = ids => {
  const wrapper = document.createElement('div');

  ids.forEach(id => {
    request(`${BASE_URL}/${id}.json`)
      .then(data => {
        const pTag = document.createElement('p');

        pTag.textContent = data.name;

        wrapper.appendChild(pTag);
      })
      .catch(err => Promise.reject(
        new Error('error', err)
      ));
  });

  phonesId.appendChild(wrapper);
};

const getPhones = () => {
  request(`${BASE_URL}.json`)
    .then(phonesData => {
      const ids = phonesData.map(key => key.id);

      getPhonesDetails(ids);
    })
    .catch(err => setTimeout(err, 5000));
};

getPhones();
