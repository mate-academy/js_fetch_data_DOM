'use strict';

const list = document.querySelector('.phones-list');
const phonesWithDetails = [];
let allIds;
const endpointList = 'phones.json';
const urlList = 'https://mate-academy.github.io/phone-catalogue-static/api/l';

const request = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        setTimeout(() => {
          return Error(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = () => request(`${urlList}${endpointList}`);

getPhones()
  .then(data => {
    allIds = data.map(el => el.id);
    getPhonesDetails(allIds, urlList);
    getList(data, list);
  });

const getPhonesDetails = (arr, url) => {
  arr.forEach(el => {
    request(`${url}phones/${el}.json`)
      .then(dataArr => {
        phonesWithDetails.push(dataArr);
      });
  });

  return phonesWithDetails;
};

const getList = (arr, parentObject) => {
  arr.forEach(el => {
    parentObject.insertAdjacentHTML('beforeend', `
      <li class="phone-item">${el.name}</li>
    `);
  });
};
