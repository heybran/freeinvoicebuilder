import FormField from "./components/FormField/index.js";

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
  const data = getFormDate(invoiceForm);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('./api/invoices', options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.error(err));
}

const showSignupForm = () => signupForm.classList.add('opened');
const showSigninForm = () => signinForm.classList.add('opened');
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

  fetch('./api/users/signup', options)
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

invoiceForm.addEventListener('submit', handleInvoiceFormSubmit);
openSignupButton.addEventListener('click', showSignupForm);
openSigninButton.addEventListener('click', showSigninForm);
signupForm.addEventListener('submit', handleSignup);
signinForm.addEventListener('submit', handleSignin);


