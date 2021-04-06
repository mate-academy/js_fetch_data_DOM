'use strict';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const options = {
  method: 'GET',
};
const body = document.querySelector('body');

const getPhones = () => {
  return fetch(`${BASE_URL}.json`, options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      }

      return response.json();
    });
};

const getPhonesDetails = (idList) => {
  const datailList = idList.map(id => {
    fetch(`${BASE_URL}/${id}.json`);
  });

  return datailList;
};

const list = document.createElement('ul');

body.append(list);

getPhones('/phones.json')
  .then(result => {
    result.map(phone => {
      const newPhone = document.createElement('li');

      list.append(newPhone);
      newPhone.append(phone.name);
    });

    return result;
  })
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails)
  .catch(error => {
    alert(error);
  });
