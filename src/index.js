import "./styles/main.scss";

//model change
const radioButtons = document.querySelectorAll('.form-group--radio__input');
const radioWrappers = document.querySelectorAll('.radio-field__wrapper');
const model = document.querySelector('#humanModel');

function modelToggleHandler(e) {
  e.stopPropagation();

  const female = "form__bmi__model__img--female";
  const male = "form__bmi__model__img--male";

  if (this.id === 'female') {
    model.classList.add(female);
    model.classList.remove(male);
  } else {
    model.classList.remove(female);
    model.classList.add(male);
  }

}

function check() { 
  const rb = this.children[0];
  if (rb.checked === false) {
    rb.checked = true
  } 
}

radioButtons.forEach(function(btn) {
  btn.addEventListener('click', modelToggleHandler)
})

radioWrappers.forEach(function(el) {
  el.addEventListener('click', check)
})


//BMI
const BMIScore = document.querySelector('#bmiScore');
const BMIDesc = document.querySelector('#bmiDesc');
const BMIContainer = document.querySelector('.form__bmi');
const wishWeightInput = document.querySelector('#wishWeight');
const heightInput = document.querySelector('#height');
const inputs = document.querySelectorAll('.form-group__input');

function BMIcalc() {
  const w = wishWeightInput.value;
  const h = heightInput.value;
  const condition1 = w > 30 && w < 200 && w !== '';
  const condition2 = h > 120 && h < 220 && h !== '';

  if (condition1 && condition2) {
    const score = Math.round((w / Math.pow((h/100), 2)) * 10) / 10;
    BMIScore.innerHTML = score;
    BMIDescriber(score);
  } else {
    BMIScore.innerHTML = 0;
    BMIDesc.innerHTML = "";
    BMIContainer.classList.remove('negative')
    BMIContainer.classList.remove('positive')
  }
}

function BMIDescriber(bmi) {
  switch(true) {
    case bmi < 18.5:
      BMIDesc.innerHTML = "Niedowaga";
      break;
    case bmi >= 25 && bmi <= 29.9:
      BMIDesc.innerHTML = "Nadwaga";
      break;
    case bmi >= 30 && bmi <= 34.9:
      BMIDesc.innerHTML = "Otyłość I stopnia";
      break;
    case bmi >= 35 && bmi <= 39.9:
      BMIDesc.innerHTML = "Otyłość II stopnia";
      break;
    case bmi >= 40:
      BMIDesc.innerHTML = "Otyłość III stopnia";
      break;
    default:
      BMIDesc.innerHTML = "Waga prawidłowa";
  }

  if (BMIDesc.innerHTML !== "Waga prawidłowa") {
    BMIContainer.classList.add('negative')
    BMIContainer.classList.remove('positive')
  } else {
    BMIContainer.classList.remove('negative')
    BMIContainer.classList.add('positive')
  }
    
}

inputs.forEach(function(input) {
  input.addEventListener('change', BMIcalc)
})


//form submit and validation
const form = document.querySelector('form');
const weightInput = document.querySelector('#weight');
const message = document.querySelector('.form__message');

function errorsFilter(arr, error) {
  arr.filter(function(item) {
    return item !== error
  })
}

function clearForm() {
  setTimeout(function(){
    message.innerHTML = "";
    wishWeightInput.value = '';
    weightInput.value = '';
    heightInput.value = '';
    BMIContainer.classList.remove('positive');
    BMIDesc.innerHTML = '';
    BMIScore.innerHTML = 0;
  }, 3000);
}

function validate(elements) {
  const wishWeight = elements.wishWeight.value;
  const weight = elements.weight.value;
  const height = elements.height.value;

  let errors = [];
  let isValid = false;
  
  if (wishWeight < 30 || wishWeight > 200 || wishWeight === '') {
    wishWeightInput.classList.add('error')
    errors.push('wishWeightError')
  } else {
    wishWeightInput.classList.remove('error');
    errorsFilter(errors, 'wishWeightError')
  }

  if (weight < 30 || weight > 200 || weight === '') {
    weightInput.classList.add('error')
    errors.push('weightError')
  } else {
    weightInput.classList.remove('error');
    errorsFilter(errors, 'weightError')
  }

  if (height < 120 || height > 220 || height === '') {
    heightInput.classList.add('error')
    errors.push('heightError')
  } else {
    heightInput.classList.remove('error');
    errorsFilter(errors, 'heightError')
  }

  errors.length > 0 
    ? isValid = false 
    : isValid = true

  return isValid
}

function validateAndSendForm(e) {
  e.preventDefault();

  const validationResult = validate(this.elements);
  const BMIResult = BMIContainer.classList.contains('positive');

  if (validationResult && BMIResult) {
    message.innerHTML = "Formularz wysłano!";
    message.classList.remove('form__message--error');
    message.classList.add('form__message--success');

    clearForm()
  }
  else {
    message.innerHTML = "Formularz zawiera błędy!";
    message.classList.remove('form__message--success');
    message.classList.add('form__message--error');
  }
}

form.addEventListener('submit', validateAndSendForm);


