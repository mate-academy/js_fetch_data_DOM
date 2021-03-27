'use strict';

// write your code here

const url = `${
  'https://mate-academy.github.io/phone-catalogue-static/api/phones.json'
}`;

const body = document.querySelector('body');
const list = document.createElement('ul');

body.append(list);

const createList = (phonesName) => {
  for (const phoneName of phonesName) {
    const li = document.createElement('li');

    li.textContent = phoneName.name;
    list.append(li);
  }
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          setTimeout(() => reject(new Error('Error'), 5000));
        }

        return response.json();
      })
      .then(response => {
        return resolve(response);
      });
  });
};

const details = `${
  'https://mate-academy.github.io/phone-catalogue-static/api/phones'
}`;

const getPhonesDetails = (arrayIds) => {
  return Promise.all(arrayIds.map((id) => {
    return new Promise((resolve, reject) => {
      fetch(`${details}/${id}.json`)
        .then((response) => {
          if (!response.ok) {
            return reject(new Error('Error'));
          }

          return resolve(response.json());
        });
    });
  }));
};

getPhones()
  .then((result) => {
    createList(result);

    const arrayPhonesId = result.map((phone) => {
      return phone.id;
    });

    getPhonesDetails(arrayPhonesId)
      .then((resolve) => resolve)
      .catch((error) => (error));
  })
  .catch((error) => {
    createList(error);
  });
