'use strict';

const BASE_URL = `https://
mate-academy.github.io/phone-catalogue-static/api/phones`;

const phonesId = document.querySelector('#phones');

const request = url => {
  return fetch(url)
    .then(response => {
      return !response.ok
        ? setTimeout(Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)), 5000)
        : response.json();
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
    });
};

getPhones();
