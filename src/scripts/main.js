'use strict';

const listURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

function getPhones(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          throw new Error('Time is over');
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (arr) => {
  const phonesWithDetails = arr.map(obj => obj.id);

  return phonesWithDetails;
};

getPhones(listURL)
  .then(getPhonesDetails)
  .then(list => {
    const unList = document.createElement('ul');

    document.body.append(unList);

    list.map(el => {
      const item = document.createElement('li');

      item.textContent = el;

      unList.append(item);
    });
  })
  .catch();
