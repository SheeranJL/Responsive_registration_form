document.querySelector('input').focus();
const otherText = document.querySelector('#other-job-role');
otherText.hidden = true;
const jobRoleSelection = document.querySelector('#title');
const colorSelection = document.querySelector('#color');
colorSelection.disabled = 'true';
designSelection = document.querySelector('#design')
form = document.querySelector('form');
const singleActivity = document.querySelector('[value = "full-stack js developer"]');
const jobSelection = document.getElementById('jobs');

// this code will listen to the 'other' selection being targeted and if so, it will show the 'other' field.
jobRoleSelection.addEventListener('change', (e) => {
  target = e.target.value
  if (target === 'other') {
    otherText.hidden = false;
  } else {
    otherText.hidden = true;
  }
});


// this code will listen for a change in the selection dropdown and will 'show' the color menu when an option is selected.
designSelection.addEventListener('change', (e) => {
  target = e.target.type;
  shirtType = e.target.value;
    if (target === 'select-one') {
      colorSelection.disabled = '';
    } else {
      colorSelection.disabled = 'true'
    }
    //this code will display only the available colors depending on what shirt is selected
    if (shirtType === 'js puns') {
      colorSelection.children[1].hidden = '';
      colorSelection.children[2].hidden = '';
      colorSelection.children[3].hidden = '';
      colorSelection.children[4].hidden = 'true';
      colorSelection.children[5].hidden = 'true';
      colorSelection.children[6].hidden = 'true';
    }
    else if (shirtType === 'heart js') {
      colorSelection.children[1].hidden = 'true';
      colorSelection.children[2].hidden = 'true';
      colorSelection.children[3].hidden = 'true';
      colorSelection.children[4].hidden = '';
      colorSelection.children[5].hidden = '';
      colorSelection.children[6].hidden = '';
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
  defaultOption.selected = false;
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

//calling function to s
paymentMethodInfo();

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


//Field selectors///

const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const cardNumberField = document.getElementById('cc-num')
const zipCodeField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const activitySelect = document.getElementById('activities')
///***Form Validation Section***///

let validateName = () => {
  let nameReg = /\S+/;
  return nameReg.test(nameField.value);
}

let validateEmail = () => {
  let emailReg = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return emailReg.test(emailField.value);
}

let jobSelect = () => {
  if (jobRoleSelection.value === 'Select Job Role') {
    return false
  } else {
    return true;
  }
}

let validateActivitySelection = () => {
  if (totalAmount === 0) {
    return false;
  } else {
    return true;
  }
}

let validateCardNum = () => {
  const cardNumReg = /^(\d{13,16})$/g;
  return cardNumReg.test(cardNumberField.value);
}

let validateZipCode = () => {
  const zipCodeReg = /^(\d{5})$/g;
  return zipCodeReg.test(zipCodeField.value);
}

let validateCVV = () => {
  const cvvReg = /^(\d{3})$/g;
  return cvvReg.test(cvvField.value);
}

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
}

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
}


form.addEventListener('submit', (event) => {
  const target = event.target;
  const creditCardSelection = document.getElementById('credit-card');

  validateAllFunction(validateName, nameField, event, 'invalid name');
  validateAllFunction(validateEmail, emailField, event, 'invalid email');
  validateAllFunction(validateActivitySelection, activitySelect.firstElementChild, event, 'No Activity Selected')
  validateJobSelection(jobSelect, jobRoleSelection, event, 'No Job Role Selected')

  if (creditCardSelection.style.display === '') {
    validateAllFunction(validateCardNum, cardNumberField, event, 'invalid card number')
    validateAllFunction(validateZipCode, zipCodeField, event, 'invalid ZIP code')
    validateAllFunction(validateCVV, cvvField, event, 'invalid CVV')
  }
});

///***Form event Handler***///
form.addEventListener('submit', (e) => {
let target = event.target;

});

///***Accessibility***///

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
