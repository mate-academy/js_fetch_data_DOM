'use strict';

const url = `https://mate-academy.github.io/`
  + `phone-catalogue-static/api/phones.json`;
const body = document.querySelector('body');
const list = document.createElement('ul');

const getPhones = () => {
  return fetch(url)
    .then((response) => response.json());
};

function notificationError(error) {
  setTimeout(() => {
    throw new Error(`Can't load phones`, error);
  }, 5000);
}

const createList = (phones) => {
  list.classList.add('list');

  phones.forEach(item => {
    list.insertAdjacentHTML('beforeend', `
    <li class="item">${item.name}</li>
    `);
  });

  body.append(list);

  return phones;
};

const getPhonesDetails = (phones) => {
  list.addEventListener('click', e => {
    const findDiv = body.querySelector('.detailsPhone');

    if (findDiv) {
      findDiv.remove();
    }

    if (e.target.closest('li')) {
      const createDetails = document.createElement('div');

      createDetails.classList.add('detailsPhone');

      const detailsText = phones
        .filter(item => e.target.innerText === item.name);

      createDetails.innerText = detailsText[0].snippet;
      body.append(createDetails);
    }
  });
};

getPhones()
  .then((phone) => createList(phone))
  .then((item) => getPhonesDetails(item))
  .catch(error => {
    notificationError(error);
  });
