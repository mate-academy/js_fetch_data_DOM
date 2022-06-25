'use strict';

const listURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const root = document.querySelector('body');
const list = document.createElement('ul');

root.append(list);

const request = (url, time = 0) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          throw new Error(`${response.status} - ${response.statusText}`);
        }, time);
      }

      return response.json();
    });
};

const getPhones = () => {
  request(listURL, 5000)
    .then(phones => {
      const ids = phones.map(phone => phone.id);

      getPhonesDetails(ids);
    });
};

const getPhonesDetails = (idsArray) => {
  idsArray.forEach(id => {
    request(`${detailsURL}${id}.json`)
      .then(result => {
        const item = document.createElement('li');

        item.innerText = result.name;
        list.append(item);
      });
  });
};

getPhones();
