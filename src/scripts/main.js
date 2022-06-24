'use strict';

// I have clear understanding that I made some shit,
//  but at least I tried and somehow it works:)

/* eslint-disable-next-line */
const LISTURL = `https://mate-academy.github.io/phone-catalogue-static/api/phones.json`;

const getPhones = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('something bad happened'));
      }

      return Promise.resolve(response.json());
    });
};

const ids = getPhones(LISTURL).then(text => {
  return text.map(tel => tel.id);
});

ids.then(text => (text));

const getPhonesDetails = (args) => {
  document.getElementsByTagName('body')[0]
    .insertAdjacentHTML('afterbegin', `
    <ul></ul>
  `);

  args.then(text => {
    const ul = document.getElementsByTagName('ul')[0];

    text.map(el => {
      /* eslint-disable-next-line */
      fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${el}.json`)
        .then(request => request.json())
        .then(phone => {
          ul.insertAdjacentHTML('beforeend', `
            <li>
              <div>name: ${phone.name}</div>
              <div>ID: ${phone.id}</div>
              <div>additionalFeatures: ${phone.additionalFeatures}</div>
              <div>android os: ${phone.android.os}</div>
              <div>android ui: ${phone.android.ui}</div>
              <div>availability: ${phone.availability}</div>
              <div>battery standbyTime: ${phone.battery.standbyTime}</div>
              <div>battery talkTime: ${phone.battery.talkTime}</div>
              <div>battery type: ${phone.battery.type}</div>
              <div>camera feature: ${phone.camera.features}</div>
              <div>camera primary: ${phone.camera.primary}</div>
              <div>bluetooth: ${phone.connectivity.bluetooth}</div>
              <div>cell: ${phone.connectivity.cell}</div>
              <div>gps: ${phone.connectivity.gps}</div>
              <div>infrared: ${phone.connectivity.infrared}</div>
              <div>wifi: ${phone.connectivity.wifi}</div>
              <div>description: ${phone.description}</div>
              <div>screenResolution: ${phone.display.screenResolution}</div>
              <div>screenSize: ${phone.display.screenSize}</div>
              <div>touchScreen: ${phone.display.touchScreen}</div>
              <div>accelerometer: ${phone.hardware.accelerometer}</div>
              <div>audioJack: ${phone.hardware.audioJack}</div>
              <div>cpu: ${phone.hardware.cpu}</div>
              <div>fmRadio: ${phone.hardware.fmRadio}</div>
              <div>physicalKeyboard: ${phone.hardware.physicalKeyboard}</div>
              <div>usb: ${phone.hardware.usb}</div>
              images: <img src='${phone.images}'></img>
              <div>dimensions: ${phone.sizeAndWeight.dimensions}</div>
              <div>weight: ${phone.sizeAndWeight.weight}</div>
              <div>flash: ${phone.storage.flash}</div>
              <div>ram: ${phone.storage.flash}</div>
            </li>

            <br>
            <br>
            <br>
          `);
        });
    });
  });
};

getPhonesDetails(ids);
