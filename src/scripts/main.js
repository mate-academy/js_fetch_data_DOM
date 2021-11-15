'use strict';

const mainUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const phoneId = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject();
        }, 5000)
      }
      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject();
      }
      return response.json();
    })
}

getPhones(mainUrl).then(result => {
  result.map(phone => {
    document.body.innerText += `,
      ${phone.name}`
  });
})

const getPhonesDetails = (url, phoneId) => {
  return fetch(`${url}${phoneId}.json`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject();
        }, 5000)
      }
      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject();
      }
      return response.json();
    })
}

getPhonesDetails(phoneId, 'motorola-xoom-with-wi-fi')
  .then(result => {
    console.log(result);
  })