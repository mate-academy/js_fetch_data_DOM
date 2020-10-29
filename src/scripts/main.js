/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
'use strict';

const BASE_URL =
  'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const request = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        if (res.status < 400) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((res) => resolve(res));
  });
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout exceeded')), 5000);
    request(`${BASE_URL}.json`).then((res) => resolve(res));
  });
};

const getPhonesIDs = async () => {
  const phones = await getPhones();

  return phones.map((phone) => phone.id);
};

const IDs = getPhonesIDs();

const getPhonesDetails = async (arr) => {
  const res = await arr.map((id) => {
    const phoneDetail = request(`${BASE_URL}/${id}.json`);

    return phoneDetail;
  });

  return Promise.all(res);
};

IDs.then((arrOfIDs) => getPhonesDetails(arrOfIDs)).then((res) =>
  console.log(res)
);
