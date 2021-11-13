'use strict';

// write your code here
const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

let url1
  = 'https://mate-academy.github.io/'
   + 'phone-catalogue-static/api/phones/:phoneId.json';

const body = document.querySelector('body');
const ol = document.createElement('ol');

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => Promise.reject(Error('error')), 5000);
      }

      return response.json();
    })
    .then(result => {
      const ph = result.map(el =>
        getPhonesDetails(el.id));

      Promise.all([...ph])
        .then(res => res.forEach(element => {
          const li = document.createElement('li');

          li.append(element.name);
          ol.append(li);
        }),

        body.append(ol),
        );
    });
}

url1 = url1.substring(0, url1.indexOf(':phoneId'));

function getPhonesDetails(id) {
  return fetch(`${url1}${id}.json`)
    .then(response => response.json())
    .catch(error => new Error(error));
}

getPhones();
