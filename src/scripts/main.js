'use strict';

const link = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const ul = document.createElement('ul');

const getPhones = url => request(url);

function request(url) {
  return fetch(url).then(response => {
    return (!response.ok
      && !response.headers.get('content-type').includes('application/json'))
      ? Promise.reject(new Error(`Error ${response.status}`))
      : response.json();
  });
}

function getPhonesDetails(r) {
  const phonesInfo = [];

  for (const el of r) {
    request(`${link}/${el.id}.json`).then(response => {
      const li = document.createElement('li');

      li.innerText = response.name;
      ul.append(li);
      phonesInfo.push(el);
    }).catch((error) => new Error(error));
  }

  document.body.append(ul);

  return phonesInfo;
}

getPhones(`${link}.json`)
  .then(r => getPhonesDetails(r)).catch(error => {
    setTimeout(() => document.body.append('Error', error), 5000);
  });
