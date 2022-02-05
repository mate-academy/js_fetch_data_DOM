'use strict';

const listUrl = `https://mate-academy.github.io/`
+ `phone-catalogue-static/api/phones.json`;
const list = document.createElement('ul');

document.body.append(list);

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(phones => resolve(phones))
      .catch(error => reject(new Error(error.message)));

    setTimeout(() => {
      reject(new Error('Fetch is too long'));
    }, 5000);
  });
}

function getPhonesDetails(ids) {
  const phonesDetails = [];

  return new Promise((resolve, reject) => {
    for (const id of ids) {
      fetch(`https://mate-academy.github.io/`
      + `phone-catalogue-static/api/phones/${id}.json`)
        .then(response => response.json())
        .then(details => phonesDetails.push(details))
        .catch(error => reject(new Error(error.message)));
    }

    resolve(phonesDetails);
  });
}

getPhones()
  .then(phones => {
    phones.map(phone => {
      const li = document.createElement('li');

      li.innerHTML = phone.name;
      list.append(li);
    });

    return phones.map(phone => phone.id);
  })
  .then(ids => getPhonesDetails(ids));
