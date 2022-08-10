'use strict';

const urlList
 = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const ulList = document.createElement('ul');
const body = document.querySelector('body');

body.append(ulList);

const request = (url) => {
  return fetch(`${urlList}${url}`)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          return `${response.status} - ${response.statusText}`;
        }
      }, 5000);

      return response.json();
    });
};

const getPhones = () => {
  request('/phones.json')
    .then(data => {
      const phoneId = data.map(phone => phone.id);

      getPhonesDetails(phoneId);
    });
};

const getPhonesDetails = (getPhone) => {
  getPhone.forEach(phoneId => request(`phones/${phoneId}.json`)
    .then(item => ulList.insertAdjacentHTML('afterbegin',
      `
        <li>
          ${item.name}  
        </li>
      `)));
};

getPhones();
