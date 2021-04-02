'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const options = {
  method: 'GET',

  // headers: {
  //   'content-type': 'application/json; charset=utf-8',
  // },
};
const body = document.querySelector('body');

const getPhones = (endPoint) => {
  return fetch(`${BASE_URL}${endPoint}`, options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      }

      return response.json();
    });
};

const getPhonesDetails = (list) => {
  const newList = list.map(phone => phone.id).map(id => {
    fetch(`${BASE_URL}/phones/${id}.json`);
  });

  return newList;
};

const parentElemnt = document.createElement('ul');

body.append(parentElemnt);

getPhones('/phones.json')
  .then(result => {
    for (let i = 0; i < result.length; i++) {
      const liElement = document.createElement('li');

      parentElemnt.append(liElement);
      liElement.append(result[i].name);
    }

    return result;
  })
  .then(getPhonesDetails)
  .catch(error => {
    alert(error);
  });
