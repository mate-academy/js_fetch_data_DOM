'use strict';

const urlList = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones.json
`;
const urlDetails = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones/
`;

const ul = document.createElement('ul');

document.body.append(ul);

const request = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => setTimeout(Promise.reject(error), 5000));
};

const getPhones = () => request(urlList);
const getPhonesDetails = (id) => request(`${urlDetails}${id}.json`);

getPhones()
  .then(result => result.map(item => {
    return getPhonesDetails(item.id)
      .then(phone => {
        const li = document.createElement('li');

        li.textContent = phone.name;
        ul.append(li);
      });
  }));
