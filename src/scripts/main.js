'use strict';

const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api';

const dataPhones = [];
const dataPhonesWithDetails = [];

const phoneString = '/phones';
const jsonFormat = '.json';
const phonesBlock = document.createElement('ul');

document.body.appendChild(phonesBlock);

function getPhonesDetails(phones) {
  phones.forEach((phone) => {
    const phoneList = document.createElement('li');

    phoneList.textContent = phone.name;
    phonesBlock.appendChild(phoneList);
  });

  const dataPromises = phones
    .map((phone) => phone.id)
    .map((idList) => {
      return fetch(phoneString + '/' + idList + jsonFormat);
    });

  return Promise.all(dataPromises);
}

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(url + phoneString + jsonFormat)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            new Error(`${response.status}`)
          );
        }

        return response.json();
      })
      .then((value) => resolve(value))
      .catch((error) => {
        const createMessage = document.createElement('div');

        createMessage.innerHTML = error;

        document.body.appendChild(createMessage);
      });

    setTimeout(() => reject(new Error()), 5000);
  });
};

getPhones()
  .then((value) => {
    value.forEach((elem) => dataPhones.push({ ...elem }));

    return value;
  })
  .then(getPhonesDetails)
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((detailsList) => {
    return dataPhones.map((el) => {
      return Object.assign(el, {
        details: detailsList.find((a) => a.id === el.id),
      });
    });
  })
  .then((value) => dataPhonesWithDetails.push(...value))
  .catch((value) => new Error());
