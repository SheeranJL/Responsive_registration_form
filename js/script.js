let title = document.getElementById('title');
let otherField = document.getElementById('other-job-role')
let nameField = document.getElementById('name');
let emailField = document.getElementById('email');
let cardNumField = document.getElementById('cc-num');
let zipCodeField = document.getElementById('zip');
let cvvCodeField = document.getElementById('cvv');
let activitiesBox = document.querySelectorAll('[type="checkbox"]');
nameField.focus();

/// SHOW/HIDE 'OTHER' JOB ROLE ///

otherField.hidden = true //Hide by default on load

title.addEventListener('change', (e) =>{
  target = e.target.value;
  if (target === 'other') {
    otherField.hidden = false;
  } else {
    otherField.hidden = true;
  }
});


//// Shirt style ////
let designDropdown = document.getElementById('design');
let designColorOptions = document.getElementById('color').children;



///helper function ///
let styleFilter = (theme, toggleOne, toggleTwo) => {
  Array.from(designColorOptions).forEach((color) => {
    if (color.dataset.theme === theme) {
      color.hidden = toggleOne;
    } else {
      color.hidden = toggleTwo;
    }
  })
}

let colorDropdown = document.getElementById('color');
colorDropdown.disabled = true;
//Event Listener on Design Dropdown//
designDropdown.addEventListener('change', (e) => {
  target = e.target.value;
  console.log(target);
  if (target === 'js puns') {
    colorDropdown[0].style.display = 'none';
    colorDropdown.disabled = false;
    styleFilter('heart js', true, false);
  } else {
    colorDropdown[0].style.display = 'none';
    colorDropdown.disabled = false;
    styleFilter('js puns', true, false);
  }
});


///Activities Section///

const activitySectionFieldset = document.getElementById('activities');
let totalCost = document.getElementById('activities-cost');
let cost = 0;

//Tuesday 9am-12pm

//This EV, and the code inside, will calculate the total cost of the tickets depending on the selection.
activitySectionFieldset.addEventListener('change', (e) => {
  target = e.target;

  if (target.checked) {
    cost += parseInt(target.getAttribute('data-cost'));
    totalCost.textContent = `Total: $${cost}`;
  } else {
    cost -= parseInt(target.getAttribute('data-cost'));
    totalCost.textContent = `Total: $${cost}`;
  }
})


///payment Section///
const paymentDropdown = document.getElementById('payment');
const cardSection = document.getElementById('credit-card');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');

//Function to show Credit Card payment option by default
function defaultOption() {
  let ccOption = document.querySelector('[value="credit-card"]');
  ccOption.selected = true;
  paypalSection.style.display = 'none';
  bitcoinSection.style.display = 'none';
}
defaultOption();

//Function to hide/show relevant payment sections depending on user input
let paymentMethods = () => {
  paymentDropdown.addEventListener('change', (e) => {
    target = e.target.value;
    cardSection.style.display = 'none';
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'none'
    console.log(target);
    if (target === 'credit-card') {
      cardSection.style.display = '';
      paypalSection.style.display = 'none';
      bitcoinSection.style.display = 'none'
    } else if (target === 'paypal') {
      paypalSection.style.display = '';
    } else {
      bitcoinSection.style.display = '';
    }
  });
}

paymentMethods();


///validation Helpers///

const validateSuccess = (element) => {
  element.parentElement.classList.add('valid');
  element.parentElement.classList.remove('not-valid');
  element.parentElement.lastElementChild.classList.add('hint');
}

const validateFail = (element) => {
  element.parentElement.classList.remove('valid');
  element.parentElement.classList.add('not-valid');
  element.parentElement.lastElementChild.classList.remove('hint');
}

const validateJobSuccess = (element) => {
  element.parentElement.style.borderColor = ''
  document.querySelector('[for="title"]').classList.add('valid');
  document.querySelector('[for="title"]').classList.remove('not-valid');
}

const validateJobFail = (element) => {
  element.parentElement.style.borderColor = 'red'
  document.querySelector('[for="title"]').classList.remove('valid');
  document.querySelector('[for="title"]').classList.add('not-valid');
}

const validateActivitiesSuccess = (element) => {
  element.classList.add('valid');
  element.classList.remove('not-valid');
  element.firstElementChild.parentElement.lastElementChild.classList.add('hint')
}

const validateActivitiesFail = (element) => {
  element.classList.add('not-valid');
  element.classList.remove('valid');
  element.firstElementChild.parentElement.lastElementChild.classList.remove('hint')
}


const nameValidator = () => {
  const nameIsValid = /\S+/.test(nameField.value);
  if (nameIsValid) {
    validateSuccess(nameField);
  } else {
    validateFail(nameField);
  }
  return nameIsValid;
};

const emailValidator = () => {
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField.value);
  if (emailIsValid) {
    validateSuccess(emailField);
  } else {
    validateFail(emailField);
  }
  return emailIsValid;
}

const cardValidator = () => {
  const cardIsValid = /^(\d{13,16})$/g.test(cardNumField.value)
  if (cardIsValid) {
    validateSuccess(cardNumField);
  } else {
    validateFail(cardNumField);
  }
  return cardIsValid;
}

const zipValidator = ()=> {
  const zipIsValid = /^(\d{5})$/g.test(zipCodeField.value)
  if (zipIsValid){
    validateSuccess(zipCodeField);
  } else {
    validateFail(zipCodeField);
  }
  return zipIsValid;
};


const cvvValidator = () => {
  let cvvIsValid = /^(\d{3})$/g.test(cvvCodeField.value);
  if (cvvIsValid) {
    validateSuccess(cvvCodeField);
  } else {
    validateFail(cvvCodeField);
  }
  return cvvIsValid;
};


const jobSelectionValidator = () => {
  if (title.value === 'Select Job Role') {
    validateJobFail(title[0]);
    console.log('failed job select')
    return false;
  } else {
    validateJobSuccess(title[0]);
    return true;
  }
}


const activityValidator = () => {
  if (cost === 0) {
    validateActivitiesFail(activitiesFieldset);
    return false;
  } else {
    validateActivitiesSuccess(activitiesFieldset);
    return true;
  }
}


//real-time validation feedback///
nameField.addEventListener('keyup', nameValidator);
emailField.addEventListener('keyup', emailValidator);
cardNumField.addEventListener('keyup', cardValidator);
zipCodeField.addEventListener('keyup', zipValidator);
cvvCodeField.addEventListener('keyup', cvvValidator);
title.addEventListener('change', jobSelectionValidator)
activitySectionFieldset.addEventListener('change', activityValidator);

//submit button validator///
const form = document.querySelector('form');

const clickValidator = (validatorFunc) => {
  if (validatorFunc() === false) {
    event.preventDefault();
  }
};

form.addEventListener('submit', (e) => {
  clickValidator(nameValidator);
  clickValidator(emailValidator);
  clickValidator(activityValidator);
  clickValidator(jobSelectionValidator);

  if (cardSection.style.display === '') {
    clickValidator(cardValidator);
    clickValidator(zipValidator);
    clickValidator(cvvValidator);
  }
});


///Assessibility///

activitiesFieldset = document.getElementById('activities');
activitiesBox = document.querySelectorAll('[type="checkbox"]');

Array.from(activitiesBox).forEach((activity) => {
  let activityCheck = activity;

  activity.addEventListener('focus', (e) => {
    target = e.target;
    target.parentElement.className = 'focus';
  });

  activity.addEventListener('blur', (e) => {
    target = e.target;
    target.parentElement.className = 'blur';
  })
})
