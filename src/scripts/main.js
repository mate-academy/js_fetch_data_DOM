'use strict';

// write your code here

const url = `https:
//mate-academy.github.io/phone-catalogue-static/api/phones.json`;

const getPhones = () => {
  return fetch(url)
    .then(response => response.json());
};

getPhones()
  .then(result => {
    getInfo(result);
  });

const getInfo = (result) => {
  const idArr = [];
  const namesArr = [];

  result.forEach(x => {
    namesArr.push(x.name);
    idArr.push(x.id);
  });

  getPhoneDetails(idArr);
  addList(namesArr);
};

const getPhoneDetails = (idArr) => {
  for (const ch of idArr) {
    const getDetail = `https:
    //mate-academy.github.io/phone-catalogue-static/api/phones/${ch}.json`;

    fetch(getDetail)
      .then(response => {
        return response.json();
      })
      .catch(error => error);
  }
};

const addList = (list) => {
  const body = document.body;
  const ul = document.createElement('ul');

  list.forEach(x => {
    const li = document.createElement('li');

    li.append(x);
    ul.append(li);
  });

  body.append(ul);
};
