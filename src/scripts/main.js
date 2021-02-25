'use strict';

const url
  = `https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;
const details
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

function getPhones(link) {
  return new Promise((resolve, reject) => {
    fetch(link)
      .then((obj) => obj.json())
      .then((res) => {
        resolve(res);
      });

    setTimeout(() => {
      reject(new Error('timeOut'));
    }, 5000);
  });
}

function getPhonesDetails(idArr) {
  return new Promise((resolve, reject) => {
    idArr.map((id) => {
      fetch(`${details}${id}`)
        .then((res) => res.json())
        .then((obj) => {
          resolve(obj);
        })
        .catch(reject(new Error('not found')));
    });
  });
}

const phones = getPhones(url);

const phonesIDArr = [];
const ul = document.createElement('ul');

phones.then((res) => {
  for (const phone of res) {
    const li = document.createElement('li');

    li.innerText = phone.name;
    ul.append(li);
    phonesIDArr.push(phone.id);
  }
});

getPhonesDetails(phonesIDArr);
document.body.append(ul);
