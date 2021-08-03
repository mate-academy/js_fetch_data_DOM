'use strict';

const listURL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';

function getPhones() {
  return fetch(listURL)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      setTimeout(() => {
        return new Error(error);
      }, 5000);
    });
};

getPhones()
  .then(result => {
    getInfo(result);
  })
  .catch(error => error);

function getInfo(result) {
  const idList = [];
  const nameOfPhones = [];

  result.forEach(phones => {
    nameOfPhones.push(phones.name); //  'list of phones' according to 1 task
  });

  result.forEach(element => {
    idList.push(element.id); //  'id of phones' according to 2 task
  });

  getPhonesDetails(idList);
  addNames(nameOfPhones);
};

function getPhonesDetails(idList) {
  for (const iterator of idList) {
    const getDetail = `https://mate-academy.github.io`
    + `/phone-catalogue-static/api/phones/${iterator}.json`;

    fetch(getDetail)
      .then((data) => {
        return data.json()
          .then(el => console.log(el)); // array of details of each phone in the list
      })
      .catch(error => error);
  };
};

function addNames(list) {
  const body = document.body;

  const ul = document.createElement('ul');

  list.forEach(elem => {
    const li = document.createElement('li');

    li.append(elem);
    ul.append(li);
  });

  body.append(ul);
};
