'use strict';

const LIST_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const ul = document.createElement('ul');
const phonesWithDetails = [];

const getData = (url) => {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        return setTimeout(() => {
          Promise.reject(`${res.status} and some other error text`);
        }, 5000);
        
      };
  
      if (!res.headers.get('content-type').includes('application/json')) {
        return setTimeout(() => {
          Promise.reject('Content type is not supported');
        }, 5000);
      };

      return res.json();
    });
};

const getPhones = () => {
  getData(LIST_URL)
    .then(result => {
      return result.map(el => {
        phonesWithDetails.push(el);

        return getPhonesDetails(el.id);
      });
    })

};

const getPhonesDetails = (id) => {
  getData(`${DETAILS_URL}${id}.json`)
    .then(result => {
      const li = document.createElement('li');

      phonesWithDetails.push(result);

      li.innerText = result.name;
      ul.append(li);
    });
};

document.body.append(ul);
getPhones();
