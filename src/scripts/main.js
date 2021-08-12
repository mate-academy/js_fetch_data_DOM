'use strict';

// write your code here
const url = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';

const ul = document.createElement('ul');

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(response.status)
        );
      })
      .catch(error => (ul.innerHTML = error))
      .then(mobiles => {
        ul.innerHTML = (mobiles.map(x => (
          `<li>${x.name}</li>`
        )).join(''));

        setTimeout(() => reject(new Error()), 5000);
      });
  });
};

getPhones();
document.body.append(ul);
