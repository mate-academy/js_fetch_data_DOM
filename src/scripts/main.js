'use strict';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

function getDataFromApi() {
  return fetch(BASE_URL);
}

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => (
      reject(new Error('Timeouted'))
    ), 5000);
  });
}

function getPhonesWithTimeout() {
  return Promise.race([
    getDataFromApi(),
    timeout(),
  ])
    .then(response => {
      return response.json();
    });
}

function getPhones() {
  return getPhonesWithTimeout()
    .then(phones => {
      const phonesIds = phones.map(phone => phone.id);

      return phonesIds;
    });
}

function getPhonesDetails(idsList) {
  const phonesDetailsList = idsList.map(id => {
    return fetch(
      // eslint-disable-next-line max-len
      `https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`
    )
      .then(response => {
        return response.json();
      });
  });

  return Promise.all(phonesDetailsList);
}

function displayList(phonesDetailsList) {
  const list = document.createElement('ul');

  phonesDetailsList.map(item => {
    const li = document.createElement('li');

    li.textContent = item.name;

    list.append(li);
  });

  document.body.append(list);
};

getPhones(BASE_URL)
  .then(getPhonesDetails)
  .then(displayList);
