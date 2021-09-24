const title = document.getElementById('title');
const otherField = document.getElementById('other-job-role')
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const cardNumField = document.getElementById('cc-num');
const zipCodeField = document.getElementById('zip');
const cvvCodeField = document.getElementById('cvv');
let activitiesBox = document.querySelectorAll('[type="checkbox"]');
nameField.focus(); //On page load the 'name' field will be selected.

/// SHOW/HIDE 'OTHER' JOB ROLE ///
otherField.hidden = true //Hide the 'other' field by default on page load

//This code will listen to click in the Job Role dropdown. If 'other' is selected, the textbox will appear. If not, it will hide.
title.addEventListener('change', (e) =>{
  target = e.target.value;
  if (target === 'other') {
    otherField.hidden = false;
  } else {
    otherField.hidden = true;
  }
});


const designDropdown = document.getElementById('design');
const designColorOptions = document.getElementById('color').children;


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
  color.value = 'Select a design theme above'
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
const totalCost = document.getElementById('activities-cost');
let cost = 0; //setting running total cost to zero.

//Tuesday 9am-12pm

//This EV, and the code inside, will calculate the total cost of the tickets depending on the selection and add to the running 'cost' variable
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


const paymentDropdown = document.getElementById('payment');
const cardSection = document.getElementById('credit-card');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');

//This function will, on page load, select the card payment option and hide the paypal and bitcoin sections
function defaultOption() {
  const ccOption = document.querySelector('[value="credit-card"]');
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


///validation helper functions to add/remove styling depending on whether input information is valud or not.
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


///The functions below will validate each input field and will call the validation styling functions above depending on the validation///

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


//real-time validation event listener. This code will run on each change/keyup when user inputs information for each section.//
nameField.addEventListener('keyup', nameValidator);
emailField.addEventListener('keyup', emailValidator);
cardNumField.addEventListener('keyup', cardValidator);
zipCodeField.addEventListener('keyup', zipValidator);
cvvCodeField.addEventListener('keyup', cvvValidator);
title.addEventListener('change', jobSelectionValidator)
activitySectionFieldset.addEventListener('change', activityValidator);


const form = document.querySelector('form'); //selecting form section which we will use to listen to submit events

//This function will ensure that the submit activity will only run if all fields are valid.
const clickValidator = (validatorFunc) => {
  if (validatorFunc() === false) {
    event.preventDefault();
  }
};

//This eventlistener listens to submit actions on the form and tests each field for validity ysing the ClickValidator function above.
form.addEventListener('submit', (e) => {
  clickValidator(nameValidator);
  clickValidator(emailValidator);
  clickValidator(activityValidator);
  clickValidator(jobSelectionValidator);

  //Only if the card selection is displayed will the code check for validity in the card input fields.
  if (cardSection.style.display === '') {
    clickValidator(cardValidator);
    clickValidator(zipValidator);
    clickValidator(cvvValidator);
  }
});


///Assessibility///

activitiesFieldset = document.getElementById('activities');
activitiesBox = document.querySelectorAll('[type="checkbox"]');

//This function will take the list of checkboxes and itierate over them to allow for the focus & blur events to run.
Array.from(activitiesBox).forEach((activity) => {
  const activityCheck = activity;
  //Code below will assign the 'focus' class to elements that are tabbed/focused on adding the blue outline style.
  activity.addEventListener('focus', (e) => {
    target = e.target;
    target.parentElement.className = 'focus';
  });
  //Code below will assign the 'blur' class to elements that are tabbed/focused on removing the blue outline style
  activity.addEventListener('blur', (e) => {
    target = e.target;
    target.parentElement.className = 'blur';
  })
})
