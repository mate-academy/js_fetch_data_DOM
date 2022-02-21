'use strict';

const BASE_URL = `https://mate-academy.github.io
/phone-catalogue-static/api/phones.json`;
const URLdetails = `https://mate-academy.github.
io/phone-catalogue-static/api/phones/`;

const request = () => {
  return fetch(`${BASE_URL}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          throw Error(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = () => request();

function getPhonesDetails(arrayOfIds) {
  const arr = arrayOfIds.map(phoneId => {
    return fetch(`${URLdetails}/${phoneId}.json`)
      .then(response => {
        if (!response.ok) {
          throw Error(`${response.status} - ${response.statusText}`);
        }

        return response.json();
      });
  });

  return arr;
}

getPhones()
  .then(result => {
    const table = document.createElement('table');
    let i = 1;
    const arrPhonesId = result.map(el => {
      table.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="border: 1px solid blue;">${i++}</td>
          <td style="border: 1px solid blue;">${el.name}</td>
        </tr>
      `);

      return el.id;
    });

    document.body.append(table);

    getPhonesDetails(arrPhonesId)
      .then(resolve => {
        return resolve;
      });
  })

  .catch();
