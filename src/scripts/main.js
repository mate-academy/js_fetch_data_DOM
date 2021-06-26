'use strict';

const baseUrl = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones`;

const phonesWithDetails = [];

// write your code here
const getPhones = () => {
  const url = baseUrl + '.json';

  return fetch(url).then((response) => response.json())
    .catch(err => setTimeout(
      () => err + '--- maybe no valid url :( ...'), 5000);
};

const getPhonesDetails = (id) => {
  const url = baseUrl + '/' + id + '.json';

  return fetch(url).then((response) => response.json())
    .catch((err) => err);
};

getPhones().then(list => {
  const listId = list.map(phone => phone.id);

  Promise.all(listId.map((id) => getPhonesDetails(id)))
    .then(response => {
      response.map((phone, index) => {
        const phoneBlock = document.createElement('div');

        phoneBlock.textContent = `${phone.name}`;
        document.body.append(phoneBlock);

        const objPhone = {};

        objPhone[listId[index]] = phone;
        phonesWithDetails.push(objPhone);
      });
    });
}).catch(err => err);
