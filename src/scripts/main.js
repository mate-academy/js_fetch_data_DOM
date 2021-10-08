'use strict';

const url
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

function getPhones() {
  return fetch(url)
    .then(data => {
      return data.json();
    });
}

getPhones().then(result => {
  getInfo(result);
});

function getInfo(result) {
  const idList = [];
  const nameOfPhones = [];

  result.forEach(phones => {
    nameOfPhones.push(phones.name); //  'list of phones' according to 1 task
    idList.push(phones.id);
  });

  getPhonesDetails(idList);
  addList(nameOfPhones);
};

function getPhonesDetails(idList) {
  for (const iterator of idList) {
    const getDetail = `https://mate-academy.github.io`
    + `/phone-catalogue-static/api/phones/${iterator}.json`;

    fetch(getDetail)
      .then((data) => {
        return data.json();
        // .then(el => console.log(el));
      })
      .catch(error => error);
  };
};

function addList(list) {
  const body = document.body;

  const ol = document.createElement('ol');

  list.forEach(elem => {
    const li = document.createElement('li');

    li.append(elem);
    ol.append(li);
  });

  body.append(ol);
};
// write your code here
