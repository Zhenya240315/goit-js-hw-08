import throttle from 'lodash.throttle';
import { setStorage, getStorage, removeStorage } from './stor';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
let storage = getStorage(storageKey);
let formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  // отримуємо та записуємо данні в сховище
  formData = storage;
  formData[event.target.name] = event.target.value;

  setStorage(storageKey, formData);
}

function onFormSubmit(event) {
  //кнопка submit. перевіряємо поля, виводимо в констоль,  очищуемо форму
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Будь ласка заповніть всі поля!');
  }

  console.log({ Email: email.value, Message: message.value });

  formData = { email: '', message: '' };
  storage = formData;
  setStorage(storageKey, formData);
  event.currentTarget.reset();
  localStorage.removeItem(storageKey);
}

function containsАormValues() {
  // заповнює форму після завантаження
  if (!storage) {
    storage = {};
    return;
  }

  if (storage.email === undefined) {
    form.elements.email.value = '';
  } else {
    form.elements.email.value = storage.email;
  }

  if (storage.message === undefined) {
    form.elements.message.value = '';
  } else {
    form.elements.message.value = storage.message;
  }
}
containsАormValues();
