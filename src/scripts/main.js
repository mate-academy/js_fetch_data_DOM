/* eslint-disable max-len */
'use strict';

// write your code here
const html = document.querySelector('html');
const listURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return fetch(listURL)
    .then(response => response.json())
    .catch(error => {
      setTimeout(() => error, 5000);
    });
};

const getPhonesDetails = (id) => {
  return fetch(`${detailsURL}${id}.json`)
    .then(response => response.json())
    .catch(error => error);
};

getPhones().then(list => {
  const listID = list.map(item => item.id);

  Promise.all(listID.map(id => getPhonesDetails(id)))
    .then(responses => {
      responses.map(phone => {
        const newPhone = document.createElement('div');

        newPhone.textContent = `${phone.name}`;
        html.append(newPhone);
      });

      const phonesWithDetails = [];

      responses.map(phone => phonesWithDetails.push(phone));
    })
    .catch(error => error);
});
