'use strict';

const baseUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      }
    });

  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => (response.json()))
      .then(list => resolve(list.map(phone => phone.id)));

    setTimeout(() => {
      reject(new Error('Error!'));
    }, 5000);
  });
};

const getPhonesDetails = (ids) => {
  const phonesDetailsList = ids.map(
    phoneId => fetch(`${detailsUrl}${phoneId}.json`)
      .then(response => response.json()
      )
  );

  return Promise.all(phonesDetailsList);
};

const displayList = (phonesDetailsList) => {
  const list = document.createElement('ul');

  phonesDetailsList.forEach(element => {
    const domElement = document.createElement('li');

    domElement.textContent = element.name;
    list.append(domElement);
  });

  document.body.append(list);
};

getPhones(baseUrl)
  .then(getPhonesDetails)
  .then(displayList);
