'use strict';

document.body.style.flexDirection = 'column';

const listUrl = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const convertData = data => {
  if (!data || (Array.isArray(data) && data[0] === '')) {
    return 'empty';
  }

  if (typeof data === 'string' || Array.isArray(data)) {
    return data;
  }

  return Object.entries(data)
    .map(([key, value]) => ` <b>${key.toUpperCase(key)}</b> - ${value}`);
};

const getPhones = url =>
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const listOfIds = data.map(phone => phone.id);

      getPhonesDetails(detailsUrl, listOfIds);
    })
    .catch(e => setTimeout(() => `Failed by this error: ${e}`, 5000));

const getPhonesDetails = (url, listOfIds) => {
  const list = document.createElement('ul');

  listOfIds.forEach(id => {
    return fetch(`${url}${id}.json`)
      .then(response => response.json())
      .then(data => {
        const nestedList = document.createElement('ol');
        const item = document.createElement('li');

        item.innerHTML = `<b>${data.name}</b>`;
        item.style.margin = '10px';

        for (const key in data) {
          if (key === 'id' || key === 'name') {
            continue;
          }

          const nestedItem = document.createElement('li');

          nestedItem.style.margin = '10px';

          nestedItem.innerHTML
            = `<b>${key}</b> : <small>${convertData(data[key])}</small>`;
          nestedList.append(nestedItem);
        }

        item.append(nestedList);
        list.append(item);
      })
      .catch(() =>
        setTimeout(e => setTimeout(() => `Failed by this error: ${e}`, 5000)));
  });

  document.body.append(list);
};

getPhones(listUrl);
