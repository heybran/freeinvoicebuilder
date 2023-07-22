// @ts-check
import FormField from "./components/FormField/index.js";
import FormButton from "./components/FormButton/index.js";

const undefinedElements = document.querySelectorAll(':not(:defined)');
const promises = [...undefinedElements].map(
  (elem) => customElements.whenDefined(elem.localName)
);

Promise.all(promises).then(() => document.querySelector('.wrapper').style.display = '');

const invoiceForm = document.forms['invoice-form'];
const signupForm = document.forms['signup-form'];
const signinForm = document.forms['signin-form'];
const openSignupButton = document.querySelector('#signup');
const openSigninButton = document.querySelector('#signin');
const pdfPreviewButton = document.querySelector('#preview-button');
const addInvoiceDetailsButtons = document.querySelectorAll('.add-invoice-details');
const invoiceBody = document.querySelector('#invoice-body');
const repeatableFields = invoiceBody.querySelectorAll('.repeatable');
let id = 0;

const addInvoiceDetails = (e) => {
  id++;

  console.log([...repeatableFields].length);

  [...repeatableFields].forEach(field => {
    field = field.cloneNode(true);
    const input = field.querySelector('input');
    if (input.name) {
      input.name = input.name + id;
    }
  
    invoiceBody.append(field);
    // invoiceBody.insertBefore(field, e.target.closest('.form-field-wrapper'));
  });
}

const getFormDate = (form) => {
  const header = {};
  const body = [
  ];
  Array.from(form.elements)
    .filter(elem => elem.name && elem.form)
    .forEach(elem => {
      if (elem.hasAttribute('data-header')) {
        header[elem.name] = elem.value
      }

      if (elem.hasAttribute('data-body')) {
        //
      }
      
    });
  
  return data;
}

const handleInvoicePreview = (e) => {
  e.preventDefault();
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

  fetch('/api/pdf/preview', options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.error(err));
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

  fetch('/api/users/signup', options)
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
pdfPreviewButton.addEventListener('click', handleInvoicePreview);

invoiceBody.addEventListener('click', (e) => {
  if (e.target.closest('form-field [type="button"]')) {
    console.log('hi')
    addInvoiceDetails(e);
  }
});