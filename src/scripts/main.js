'use strict';

const link
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(link)
      .then(result => {
        return resolve(result.json());
      })
      .catch(error => {
        setTimeout(() => {
          return reject(new Error(error));
        }, 5000);
      });
  });
}

function addElements() {
  document.body.insertAdjacentHTML('beforeend', `
    <ul></ul>
  `);

  getPhones()
    .then(result => {
      result.map(item => {
        const li = document.createElement('li');

        li.innerText = item.id;
        document.body.lastElementChild.append(li);
      });
    })
    .catch(error => new Error(error));
}

addElements();
