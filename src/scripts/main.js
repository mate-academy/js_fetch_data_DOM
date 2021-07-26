'use strict';

const list = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';

const newList = document.createElement('ul');

const getPhones = function() {
  return new Promise((resolve, reject) => {
    fetch(list)
      .then(a => {
        if (a.ok) {
          return a.json();
        }

        return Promise.reject(
          new Error(a.status)
        );
      })
      .catch(error => (newList.innerHTML = error))
      .then(b => {
        newList.innerHTML = (b.map(x => (
          `<li>${x.name}</li>`
        )).join(''));

        setTimeout(() => reject(new Error()), 5000);
      });
  });
};

getPhones();
document.body.append(newList);
