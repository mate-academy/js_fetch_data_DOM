'use strict';

const list = document.createElement('ul');

document.body.append(list);

const request = (
  endPoint = '',
  dataFormat = '.json',
  params = { method: 'GET' },
  baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api'
) => {
  return fetch(`${baseUrl}${endPoint}${dataFormat}`, params)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return new Error('Error with request');
        });
      };

      return response.json();
    });
};

const getPhones = () => {
  return request('/phones');
};

const getPhonesDetails = (id) => {
  return request(`/phones/${id}`);
};

getPhones()
  .then(data => {
    return Promise.all(data.map(el => getPhonesDetails(el.id)));
  })
  .then(phones => {
    phones.forEach(phone => {
      list.insertAdjacentHTML(
        'beforeend',
        `<li>${phone.name}</li>`
      );
    });
  });
