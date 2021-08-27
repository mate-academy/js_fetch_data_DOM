'use strict';

const url = `
   https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;
const detailsUrl = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones/`;
const getPhones = () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((reject) => {
      setTimeout(() => {
        return new Error(reject);
      }, 5000);
    });
};
const getPhonesDetails = (ids) => {
  fetch(`${detailsUrl}` + `${ids}.json`)
    .then(res => res.json())
    .then(phone => phone);
};

getPhones().then((result) => {
  result.map(phoneID => getPhonesDetails(phoneID.id));

  const ul = document.createElement('ul');

  document.body.append(ul);

  result.forEach((item) => {
    ul.insertAdjacentHTML('beforeend', `
        <li>${item.name}</li>`);
  });
});
