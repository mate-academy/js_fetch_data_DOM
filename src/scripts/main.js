import { getPhones, getPhonesDetails } from './fetchData';

function getIds(phones) {
  return phones.reduce((accumulator, current) => {
    return [...accumulator, current.id];
  }, []);
}

function showNames(phones) {
  const list = document.createElement('ul');

  phones.forEach(phone => {
    list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
  });

  document.querySelector('body').prepend(list);
}

getPhones()
  .then(phones => {
    showNames(phones);

    getPhonesDetails(getIds(phones))
      .then(response => {
      // const phonesWithDetails = phones.reduce((accumulator, current, i) => {
        //   return [...accumulator, Object.assign(current, response[i])];
        // }, []);
      });
  });
