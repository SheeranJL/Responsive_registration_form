document.querySelector('input').focus();
const otherText = document.querySelector('#other-job-role');
otherText.hidden = true;
const jobRoleSelection = document.querySelector('#title');
const colorSelection = document.querySelector('#color');
colorSelection.disabled = 'true';
designSelection = document.querySelector('#design')



let test = document.querySelector("#activities-box > label:nth-child(3) > span.activity-cost").textContent
let int = parseInt(test);
console.log(int);

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


const activityFieldset = document.getElementById('activities');
let labelCost = document.getElementById('activities-cost');
let totalAmount = 0; //total amount for product selection

activityFieldset.addEventListener('change', (e) => {
  let checkedItem = event.target; //grabbing the event object
  let label = checkedItem.parentElement; //transversing the the parent of the target item
  let cost = label.querySelector('.activity-cost').textContent //selecting the cost figure string
  let intCost = cost.substr(1) //stripping the $ off the string to use it as an integer in next line
  totalAmount += parseInt(intCost); //convering intCost string to integer and adding value to total amount
  labelCost.innerHTML = `Total: $${totalAmount}`;//

});
