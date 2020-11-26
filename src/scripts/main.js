'use strict';

const request = (url) => {
    return fetch(`${'https://mate-academy.github.io/phone-catalogue-static/api'}${url}`) /* eslint-disable-line */
      .then(response => {
        return response.json();
      });
  };
  
  function getPhones() {
    return new Promise((resolve, reject) => {
      resolve(request('/phones.json'));
  
      setTimeout(() => {
        reject('Reject');
      }, 5000);
    });
  }
  
  const phoneList = getPhones();
  
  phoneList
    .then(
      result => console.log(result),
      error => console.warn(error)
    );
  
  phoneList
    .then(
      list => Promise.all(
        list.map(currentPhone => {
          const phonesWithDetails = new Promise((resolve, reject) => {
            resolve(request(`/phones/${currentPhone.id}.json`));
          });
  
          phonesWithDetails
            .then(basicInfoOfPhone =>
              Object.assign(basicInfoOfPhone, currentPhone));
  
          return phonesWithDetails;
        })
      )
        .then(result => console.log(result))
    );
