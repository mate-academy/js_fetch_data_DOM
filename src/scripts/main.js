'use strict';

// eslint-disable-next-line max-len
const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line max-len
const detailsUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          // eslint-disable-next-line max-len
          return Promise.reject(new Error('It was an accident, next time will be better ...or not'));
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (arrId) => {
  return Promise.all(arrId.map(id =>
    fetch(`${detailsUrl}${id}.json`)));
};

getPhones()
  .then(phones => {
    const ids = phones.map(p => p.id);

    return getPhonesDetails(ids);
  })
  .then(myPhones => Promise.all(myPhones.map(res => res.json())))
  .then(res => show(res))
  .catch(error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  });

function show(phones) {
  const list = document.createElement('table');

  for (const phone of phones) {
    list.insertAdjacentHTML('beforeend', `<tr> 
         <td>${phone.name} </td>        
         </tr>`
    );
  }

  document.body.appendChild(list);
}
