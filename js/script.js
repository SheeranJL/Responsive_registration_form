///***VARIABLES***///
const otherText = document.querySelector('#other-job-role');
  otherText.hidden = true;
const jobRoleSelection = document.querySelector('#title');
const colorSelection = document.querySelector('#color');
  colorSelection.disabled = 'true';
const designSelection = document.querySelector('#design')
const form = document.querySelector('form');
const singleActivity = document.querySelector('[value = "full-stack js developer"]');
const jobSelection = document.getElementById('jobs');
const jsPunsShirt = document.querySelectorAll('[data-theme = "js puns"]');
const jsHeartShirt = document.querySelectorAll('[data-theme = "heart js"]');

document.querySelector('input').focus();

///***JOB 'OTHER' SELECTION HANDLER***///
// this code will listen to the 'other' selection being targeted and if so, it will show the 'other' field.
jobRoleSelection.addEventListener('change', (e) => {
  target = e.target.value
  if (target === 'other') {
    otherText.hidden = false;
  } else {
    otherText.hidden = true;
  }
});

///***SHIRT TOGGLE HELPER FUNCTION***///
// function to select short color types. This will be used when displaying the correct shirt options
let shirtToggle = (nodeList, toggle) => {
  Array.from(nodeList).forEach((item) => {
    item.hidden = toggle;
  })
};

// this code will listen for a change in the selection dropdown and will 'show' the color menu when an option is selected.
designSelection.addEventListener('change', (e) => {
  target = e.target.type;
  shirtType = e.target.value;
  console.log(target);
  console.log(shirtType);
    if (target === 'select-one') {
      colorSelection.disabled = '';
    } else {
      colorSelection.disabled = 'true'
    }

    //this code will display only the available colors depending on what shirt is selected
    if (shirtType === 'js puns') {
      shirtToggle(jsHeartShirt, 'true');
      shirtToggle(jsPunsShirt, '');
    }
    else if (shirtType === 'heart js') {
      shirtToggle(jsPunsShirt, 'true');
      shirtToggle(jsHeartShirt, '');
    }
});

////****Costing section****////
let activityFieldset = document.getElementById('activities'); //This selects the fieldset
let labelCost = document.getElementById('activities-cost'); //This is for the total cost shown on form
let totalAmount = 0; //total amount for product selection
let paymentMethod = document.querySelector('#payment');

///Select Credit Card as default opton on page load///
function defaultPaymentOption() {
  const defaultOption = document.querySelector('[value = "credit-card"]');
  defaultOption.selected = true;
}

defaultPaymentOption();


/// Hide/Show relevant payment options and information on selection ///
function paymentMethodInfo() {
  const cardInfo = document.getElementById('credit-card');
  const paypalInfo = document.getElementById('paypal');
  const bitcoinInfo = document.getElementById('bitcoin');
  paypalInfo.style.display = 'none';
  bitcoinInfo.style.display = 'none';

  paymentMethod.addEventListener('change', (event) => {
    cardInfo.style.display = 'none';
    paypalInfo.style.display = 'none';
    bitcoinInfo.style.display = 'none';
    if (event.target.value === 'credit-card') {
      cardInfo.style.display = '';
    } else if (event.target.value === 'paypal') {
      paypalInfo.style.display = '';
    } else {
      bitcoinInfo.style.display = '';
    }
  })
};

paymentMethodInfo();


let activitiesBox = document.querySelector('#activities-box');
//event listener on the fieldset to listen to any change events within checkbox elements
activityFieldset.addEventListener('change', (e) => {
  let target = event.target; //grabbing the event element
  let ticketPrice = parseInt(target.getAttribute('data-cost')); //grabbing product cost and converting to integer
  if (target.checked) { //if target is checked
    totalAmount += ticketPrice; //increase the totalAmount by the ticketPrice
  } else if (target.checked === false) { //else if the checkbox is not checked (or unchecked)
    totalAmount -= ticketPrice; //minus the totalAmount by the ticketPrice;
  }
  labelCost.innerHTML = `Total: $${totalAmount}`; //setting the innerHTML for the total price using template literals
});


const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const cardNumberField = document.getElementById('cc-num')
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const activitySelect = document.getElementById('activities')


///***FORM VALIDATION FUNCTIONS (REGEX)***///
//The following helper functions will validate each section of the form.
let validateName = () => {
  let nameReg = /\S+/;
  return nameReg.test(nameField.value);
};

let validateEmail = () => {
  let emailReg = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return emailReg.test(emailField.value);
};

let jobSelect = () => {
  if (jobRoleSelection.value === 'Select Job Role') {
    return false
  } else {
    return true;
}};

let validateActivitySelection = () => {
  if (totalAmount === 0) {
    return false;
  } else {
    return true;
}};

let validateCardNum = () => {
  const cardNumReg = /^(\d{13,16})$/g;
  return cardNumReg.test(cardNumberField.value);
};

let validateZipCode = () => {
  const zipCodeReg = /^(\d{5})$/g;
  return zipCodeReg.test(zipCodeField.value);
};

let validateCVV = () => {
  const cvvReg = /^(\d{3})$/g;
  return cvvReg.test(cvvField.value);
};

///***FIELD SECTION STYLE ADD/REMOVE FUNCTION***///
//This function will accept the functions above as a callback and add/remove validation styling as well as preventing default behaviour if invalid.
let validateAllFunction = (functionName, element, event, message) => {
  if (functionName() === false) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.classList.remove('hint');
    console.log(message)
    event.preventDefault();
  } else {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.classList.add('hint');
  }
};

///***JOB SELECTION DROPDOWN STYLE ADD/REMOVE FUNCTION***///
//I created this seperate function for the Job Role dropdown menu. This was not..
//..required but I wanted to do it anyway.
let validateJobSelection = (functionName, element, event, message) => {
  if (functionName() === false) {
    element.style.borderColor = 'red';
    console.log('No Job Selected')
    event.preventDefault();
    jobSelection.lastElementChild.classList.remove('hint');
  } else {
    element.style.borderColor = '';
    element.parentElement.classList.add('valid');
    jobSelection.lastElementChild.classList.add('hint');
  }
};

///***FORM EVENT HANDLER***///
//This function will listen to submit events and run the validators against each field.
form.addEventListener('submit', (event) => {
  const target = event.target;
  const creditCardSelection = document.getElementById('credit-card');

  //This code will validate all fields up to the payment section.
  validateAllFunction(validateName, nameField, event, 'invalid name');
  validateAllFunction(validateEmail, emailField, event, 'invalid email');
  validateAllFunction(validateActivitySelection, activitySelect.firstElementChild, event, 'No Activity Selected')
  validateJobSelection(jobSelect, jobRoleSelection, event, 'No Job Role Selected')
  // This IF statement will only run if the user selects Credit Card as their preferred payment method..
  //..and will validate the card fields.
  if (creditCardSelection.style.display === '') {
    validateAllFunction(validateCardNum, cardNumberField, event, 'invalid card number')
    validateAllFunction(validateZipCode, zipCodeField, event, 'invalid ZIP code')
    validateAllFunction(validateCVV, cvvField, event, 'invalid CVV')
  }
});


///***ACCESSIBILITY EVENT HANDLER***///
//This code allows for tabbing over the checkbox section and will highlight/dehighlight each checkbox accordingly
const checkboxes = document.querySelectorAll('input[type=checkbox]');

Array.from(checkboxes).forEach((checkbox) => {
  let checkboxElement = checkbox;

  checkboxElement.addEventListener('focus', (e) => {
    let target = e.target;
    let checkboxParent = target.parentNode;
    checkboxParent.classList.add('focus');
  });

  checkboxElement.addEventListener('blur', (e) => {
    let target = e.target;
    let checkboxParent = target.parentNode;
    checkboxParent.classList.remove('focus');
  });
});
