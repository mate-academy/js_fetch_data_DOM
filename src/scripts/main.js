'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => response.json());
};

const phonesList = document.createElement('ul');

document.body.append(phonesList);

const getPhones = () => {
  request('/phones.json')
    .then(phones => {
      const phonesIdList = phones.map(item => item.id);

      getPhonesDetails(phonesIdList);
    })
    .catch(error => {
      setTimeout(() => {
        Error(error);
      }, 5000);
    });
};

const getPhonesDetails = (phonesIdList) => {
  phonesIdList.map(id => {
    request(`/phones/${id}.json`)
      .then(item => {
        const li = document.createElement('li');

        li.innerText = item.name;
        phonesList.append(li);
      })
      .catch(error => {
        Error(error);
      });
  });
};

getPhones();
