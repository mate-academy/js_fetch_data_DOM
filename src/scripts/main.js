'use strict';
// eslint-disable-next-line
const listUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line
const detailUrl = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json';
const phonesWithDetails = [];

const getPhones = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      throw new Error('Time out');
    }, 5000);

    fetch(listUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Can't load this page`);
        }

        resolve(response.json());
      }).catch(error => {
        // eslint-disable-next-line
        console.warn(error);
      });
  });
};

function getPhonesDetails(listPhones) {
  const body = document.querySelector('body');
  const list = document.createElement('ul');

  listPhones.forEach(phone => {
    const li = document.createElement('li');

    li.innerText = phone.name;
    list.append(li);
    phonesWithDetails.push(phone);

    fetch(detailUrl.replace(':phoneId', phone.id))
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`Can't load this page`));
        }

        return response.json();
      })
      .then(result => {
        phonesWithDetails.forEach(p => {
          if (p.id === result.id) {
            p.details = result;
          }
        });
      }).catch(error => {
        // eslint-disable-next-line
        console.warn(error);
      });
  });

  body.append(list);
}

getPhones()
  .then(result => {
    getPhonesDetails(result);
  })
  .catch(error => {
    // eslint-disable-next-line
    console.warn(error);
  });
