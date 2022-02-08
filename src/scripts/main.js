'use strict';

const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const detailsURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const getPhones = () => {
  const fetchingPromise = fetch(baseUrl)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        );
      }

      return response.json();
    });

  const waitingPromise = new Promise(
    () => {
      setTimeout(() => {
        fetchingPromise.reject('timeout');
      }, 5000);
    }
  );

  waitingPromise.then();

  return fetchingPromise;
};

const getPhonesDetails = (id) => {
  return fetch(`${detailsURL}/${id}.json`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        );
      }

      return response.json();
    });
};

const detailsArr = [];
const phonesWithDetails = [];

getPhones()
  .then(phones => {
    const promisesArr = phones.map(phone => getPhonesDetails(phone.id));

    const ul = document.createElement('ul');

    document.body.append(ul);

    Promise.all(promisesArr)
      .then(details => {
        details.map(el => {
          detailsArr.push(el);

          const li = document.createElement('li');

          li.innerText = el.name;
          ul.append(li);

          phones.map(phone => {
            phone.details = el;
            phonesWithDetails.push(phone);
          });
        });
      });
  })
  .catch(error => error);
