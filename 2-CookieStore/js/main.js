import * as helpers from '../modules/helpers.js';

function init() {
  const day = 24 * 60 * 60 * 1000;
  const promiseArray = [
    cookieStore.set({
      name: 'cookie1',
      value: 'cookie1-value',
      expires: Date.now() + day,
    }),
    cookieStore.set({
      name: 'cookie2',
      value: 'cookie2-value',
      expires: Date.now() + day,
    }),
  ];

  let promise = Promise.all(promiseArray);

  promise.then(() => {
    helpers.addMessage('cookie1 en cookie2 created');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    btn1.onclick = show2ndCookieValue;
    btn2.onclick = showAllCookies;
    btn3.onclick = clearMessages;
  });
}

function showAllCookies() {
  let cookiesPromise = cookieStore.getAll();
  cookiesPromise.then((cookies) => {
    if (cookies.length !== 0) {
      console.log(cookies);
      for (const cookie of cookies) {
        helpers.addMessage(`${cookie.name} : ${cookie.value}`);
      }
    } else {
      helpers.addMessage('Geen Cookies gevonden');
    }
  });
}

function show2ndCookieValue() {
  let cookiePromise = cookieStore.get('cookie2');
  cookiePromise.then((cookies) => {
    if (cookies) {
      helpers.addMessage(cookies.value);
    } else {
      helpers.addMessage('Cookie niet gevonden');
    }
  });
}

function clearMessages() {
  helpers.clearMessages();
}

window.onload = init;
