'use strict';

// write your code here
const logo = document.querySelector('.logo');
const listUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones() {
  const resolver = (resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(response => resolve(response));

    setTimeout(() => {
      reject();
    }, 5000);
  };

  return new Promise(resolver);
}

function getPhone(dataFromServer) {
  logo.insertAdjacentHTML('afterend', (`
    <div>
      <ul>
      ${dataFromServer.map(data => {
      return (
        `<li>${data.name}</li>`
      );
    }).join('')}
      </ul>
    </div>
  `));

  return dataFromServer;
}

function getPhonesWithDetails(data) {
  const phoneList = data.map(({ id }) => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(phoneList);
}

function failData() {
  logo.insertAdjacentHTML('afterend', (`
    <div>
      <p>Fail data!!!</p>
    </div>
  `));
}

getPhones()
  .then(getPhone)
  .then(getPhonesWithDetails)
  .catch(failData);
