import FormField from "./components/FormField/index.js";
import FormButton from "./components/FormButton/index.js";

const invoiceForm = document.forms['invoice-form'];
const signupForm = document.forms['signup-form'];
const signinForm = document.forms['signin-form'];
const openSignupButton = document.querySelector('#signup');
const openSigninButton = document.querySelector('#signin');

const getFormDate = (form) => {
  const data = {};
  Array.from(form.elements)
    .filter(elem => elem.name && elem.form)
    .forEach(elem => data[elem.name] = elem.value);
  
  return data;
}

const handleInvoiceFormSubmit = (e) => {
  e.preventDefault();
  // const formData = new FormData(invoiceForm);
  // console.log(formData);
  const data = {
    ...getFormDate(invoiceForm),
    paid: false
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  }; 

  // fetch('./api/invoices', options)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => console.error(err));
  
  fetch('/api/pdf/create', options)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
    })
    .catch(err => console.error(err));
}

const hideVisibleForm = (e) => {
  const formVisible = document.querySelector('form.opened');
  if (!e.target.closest('form.opened') && formVisible) {
    formVisible.classList.remove('opened');
    document.removeEventListener('click', hideVisibleForm);
  }
}

const showSignupForm = () => {
  signupForm.classList.add('opened')
  const id = setTimeout(() => {
    document.addEventListener('click', hideVisibleForm);
    clearTimeout(id);
  }, 0);
};

const showSigninForm = () => {
  signinForm.classList.add('opened')
  const id = setTimeout(() => {
    document.addEventListener('click', hideVisibleForm);
    clearTimeout(id);
  }, 0);
};

const handleSignup = (e) => {
  e.preventDefault();
  const data = getFormDate(signupForm);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/api/users/verification', options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

const handleSignin = (e) => {
  e.preventDefault();
  const data = getFormDate(signinForm);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('./api/users/signin', options)
    .then(res => res.json())
    .then(data => localStorage.setItem('token', data.token))
    .catch(err => console.error(err));
}

invoiceForm.addEventListener('submit', handleInvoiceFormSubmit);
openSignupButton.addEventListener('click', showSignupForm);
openSigninButton.addEventListener('click', showSigninForm);
signupForm.addEventListener('submit', handleSignup);
signinForm.addEventListener('submit', handleSignin);
