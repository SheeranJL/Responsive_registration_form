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
  console.log(shirtType);
  console.log(target);
  if (target === 'select-one') {
    colorSelection.disabled = '';
  } else {
    colorSelection.disabled = 'true'
  }
  //this code will display only the available colors depending on what shirt is selected
   if (shirtType === 'js puns') {
     for (let i = 1; i <= colorSelection.length; i++) {
       if (colorSelection.children[i].dataset.theme === 'js puns') {
         colorSelection.children[1].hidden = '';
         colorSelection.children[2].hidden = '';
         colorSelection.children[3].hidden = '';
         colorSelection.children[4].hidden = 'true';
         colorSelection.children[5].hidden = 'true';
         colorSelection.children[6].hidden = 'true';
       }
     }
   } else if (shirtType === 'heart js') {
      for (let i = 1; i <= colorSelection.length; i++) {
        if (colorSelection.children[i].dataset.theme === 'heart js') {
          colorSelection.children[1].hidden = 'true';
          colorSelection.children[2].hidden = 'true';
          colorSelection.children[3].hidden = 'true';
          colorSelection.children[4].hidden = '';
          colorSelection.children[5].hidden = '';
          colorSelection.children[6].hidden = '';
       }
     }
   }
});

////****Costing section****////
const activityFieldset = document.getElementById('activities'); //This selects the fieldset
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

payment.addEventListener('change', (e) => {
  let selection = e.target;
  console.log(selection)
});
