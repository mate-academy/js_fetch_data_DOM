'use strict';

const mainUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';
const endPoints = {
  phones: '/phones.json',
  phoneByID: (id) => `/phones.json/${id}.json`,
};

const request = (url) => {
  return fetch(`${mainUrl}${url}`)
    .then(response => response.json())
    .catch(error => setTimeout(Promise.reject(error), 5000));
};

module.exports = {
  endPoints,
  request,
};
