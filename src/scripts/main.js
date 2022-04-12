'use strict';

const listUrl = `https://mate-academy.github.io/`
+ `phone-catalogue-static/api/phones.json`;
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const listOfPhonesId = data.map(phone => phone.id);

      getPhonesDetails(detailsUrl, listOfPhonesId);
    })
    .catch(() => {
      setTimeout(() => (new Error('Timeout')), 5000);
    });
};

const getPhonesDetails = (url, listOfId) => {
  const listUlPhones = document.createElement('ul');

  listOfId.forEach(id => {
    return fetch(url + id + '.json')
      .then(response => response.json())
      .then(data => {
        const eachLiPhone = document.createElement('li');

        eachLiPhone.textContent = `${data.name}`;
        listUlPhones.append(eachLiPhone);
      })
      .catch(() => {
        setTimeout(() => (new Error('Timeout')), 5000);
      });
  });

  document.body.append(listUlPhones);
};

getPhones(listUrl);
