'use strict';

const listURL = `https://mate-academy.github.io/
phone-catalogue-static/api/phones`;

const request = (url, id = '.json') => {
  return fetch(`${url}${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

const getPhones = () => request(listURL);

getPhones()
  .then(result => addPhonesList(result))
  .catch(err => alert(err));

function addPhonesList(data) {
  const div = document.createElement('div');

  div.className = 'phones';

  const ul = document.createElement('ul');

  div.append(ul);

  data.map(phone => ul.insertAdjacentHTML('beforeend', `
    <li id=${phone.id}>
      ${phone.name}
    </li>
  `));

  document.body.append(div);

  div.style.cssText = `
    background-color: black;
    color: white;
    width: 400px;
  `;

  const phonesId = data.map(phone => phone.id);
  const phonesWithDetails = [];

  function getPhonesDetails(array) {
    array.map(item => {
      request(listURL, '/' + item + '.json')
        .then(result => {
          const phoneIdWithDetails = {};

          phoneIdWithDetails[result.id] = result;
          phonesWithDetails.push(phoneIdWithDetails);
        })
        .catch(err => alert(err));
    });
  };

  getPhonesDetails(phonesId);
};
