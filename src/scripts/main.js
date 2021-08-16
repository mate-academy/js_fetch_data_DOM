'use strict';

// write your code here
const url = 'https://mate-academy.github.io/phone-catalogue-static/api/';

const ul = document.createElement('ul');

const getPhones = () => {
  return new Promise((resolve) => {
    resolve(fetch(url + 'phones.json')
      .then(request => request.json())
    );
  }).catch(message => {
    setTimeout(() => {
      ul.innerHTML = `${message}`;
    }, 5000);
  });
};

const getPhonesDetails = (ids) => {
  const result = Promise.all(ids.map(id => {
    return new Promise((resolve) => {
      return resolve(url + `phones.${id}.json`);
    });
  }));

  return result;
};

getPhones().then(mobiles => {
  mobiles.map(mobile => ul.insertAdjacentHTML('afterbegin', `
    <li>${mobile.name}</li>
    `));
});

getPhones().then(response => getPhonesDetails(response.map(phone => phone.id)));

document.body.append(ul);
