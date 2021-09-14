document.querySelector('input').focus();
const otherText = document.querySelector('#other-job-role');
otherText.hidden = true;
const jobRoleSelection = document.querySelector('#title');
const colorSelection = document.querySelector('#color');
colorSelection.disabled = 'true';
designSelection = document.querySelector('#design')


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


////****Payment Section****////

let payment = document.querySelector('.payment-methods');

function showHideMenu(id, toggle) {
  document.querySelector(id).hidden = toggle;
}

function hideShowFlex(id, toggle) {
  document.querySelector(id).style.display = toggle;
}

payment.addEventListener('change', (e) => {
  let selection = e.target;
  if (selection.value === 'credit-card') {
    showHideMenu('#paypal', 'true');
    showHideMenu('#bitcoin', 'true');
    hideShowFlex('#credit-card', '');
  } else if (selection.value === 'paypal') {
    showHideMenu('#paypal', '');
    showHideMenu('#bitcoin', 'true');
    hideShowFlex('#credit-card', 'none');
  } else if (selection.value === 'bitcoin') {
    showHideMenu('#paypal', 'true')
    showHideMenu('#bitcoin', '');
    hideShowFlex('#credit-card', 'none');
  }
});

///***Form Validation Section***///

let submit = document.querySelector('button[type="submit"]');
let form = document.querySelector('form');
let nameField = document.querySelector('#name');
let emailField = document.querySelector('#email');
let jobTitle = document.querySelector('#title');
let creditCardInfo = document.querySelector('#credit-card');
let zipCode = document.querySelector('#zip');
let cvvCode = document.querySelector('#cvv')
let creditCardNum = document.querySelector('#cc-num');

form.addEventListener('submit', (e) => {
  let target = event.target;
  let nameReg = /\S+/;
  let emailReg = /^[^@]+@[^@.]+\.[a-z]+$/i;
  let cardNumReg = /^(\d{13,16})$/g;
  let zipCodeReg = /^(\d{5})$/g;
  let cvvReg = /^(\d{3})$/g;

  if (nameReg.test(nameField.value) === false) {
    alert('You must enter a name');
    event.preventDefault()
  }
  else if (emailReg.test(emailField.value) === false) {
    alert('You must enter a valid email');
    event.preventDefault()
  }
  else if (jobTitle.value === 'Select Job Role') {
    alert('You must select a job title');
    event.preventDefault()
  }
  else if (creditCardInfo.style.display === '') { //if the credit card info is showing....
    // add if statements here
    if (cardNumReg.test(creditCardNum.value) === false) {
      alert('Enter a card number 13 or 16 numbers long with no spaces or dashes')
      event.preventDefault()
    }
    else if (zipCodeReg.test(zipCode.value) === false) {
      alert('You must enter a 5 digit zip code');
      event.preventDefault()
    }
    else if (cvvReg.test(cvvCode.value) === false) {
      alert('You must enter a 3 digit cvv');
      event.preventDefault()
    }
    else {
      console.log('success');
      //event.preventDefault()
    }
    } else {
      console.log('success');
  }
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
