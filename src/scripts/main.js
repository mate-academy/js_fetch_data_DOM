'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const options = {
  method: 'GET',
};

const body = document.querySelector('body');

const getPhones = (endPoint) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${endPoint}`, options)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(
            `${response.status} - ${response.statusText}`
          ));
        }

        resolve(response.json());

        setTimeout(() => {
          reject(new Error());
        }, 5000);
      });
  });
};

const getPhonesDetails = (listOfPhones) => {
  const newList = listOfPhones.map(phone => phone.id).map(id => {
    fetch(`${BASE_URL}/phones${id}.json`);
  });

  return Promise.all(newList);
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
  })
  .then(getPhonesDetails)
  .catch(error => {
    alert(error);
  });
