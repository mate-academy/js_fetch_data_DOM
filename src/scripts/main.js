'use strict';

const listURL = `https://mate-academy.github.io/
phone-catalogue-static/api/phones.json`;
const detailsURL = `https://mate-academy.github.io/
phone-catalogue-static/api/phones/:phoneId.json`;

const request = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

const getPhones = () => request(listURL);
const getPhonesDetails = () => request(detailsURL);

getPhones()
  .then(result => addPhonesList(result))
  .catch(err => alert(err));

getPhonesDetails()
  .then(result => result)
  .catch(err => alert(err));

const addPhonesList = (data) => {
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.append(ul);

  data.map(phone => ul.insertAdjacentHTML('beforeend', `
    <li>
      ${phone.name}
    </li>
  `));

  document.body.append(div);

  div.style.cssText = `
    background-color: black;
    color: white;
  `;
};
