'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(response => resolve(response));

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
};

const getPhonesDetails = (urls) => {
  const links = urls.map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(links);
};

const renderingDom = (dataFromServer) => {
  const ul = document.createElement('ul');

  ul.insertAdjacentHTML('afterbegin', `
    ${dataFromServer.map(phone => `<li>${phone.name}</li>`).join(' ')}
  `);

  document.body.append(ul);
};

getPhones()
  .then(renderingDom)
  .then(getPhonesDetails)
  .catch(() => new Error('something wrong'));
