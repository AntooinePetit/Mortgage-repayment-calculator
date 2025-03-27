/*
<h2>Your results</h2>
<p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
<div>
   <p>Your monthly repayments</p>
   <p id="result-repayments">£1,797.74</p>
   <hr>
   <p>Total you'll repay over the term</p>
   <p id="result-total">£539,322.94</p>
</div>
*/

/*
<p class="error-label">This field is required</p>
*/

// Function to display the results
function displayResults(repayment, interest, monthlyRepayment){
   const results = document.querySelector('#results')
   results.classList.add('completed')
   results.innerHTML=`
   <h2>Your results</h2>
   <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
   <div>
      <p>Your monthly repayments</p>
      <p id="result-repayments">£${monthlyRepayment}</p>
      <hr>
      <p>Total you'll repay over the term</p>
      <p id="result-total">£${repayment}</p>
   </div>
   `
}

// Function to return to default display
function displayDefault(){
   const results = document.querySelector('#results')
   results.classList.remove('completed')
   results.innerHTML=`
      <img src="assets/images/illustration-empty.svg" alt="Illustration empty results">
      <h2>Results shown here</h2>
      <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
   `
}

// Setting focus state on inputs
const inputs = document.querySelectorAll('input[type="number"]')
inputs.forEach(input => {
   input.addEventListener('focus', () => {
      document.querySelector(`#div-${input.name}`).classList.add('active-input');
   });
   input.addEventListener('blur', () => {
      document.querySelector(`#div-${input.name}`).classList.remove('active-input');
   });
})

// Setting checked style on radio inputs
const radio = document.querySelectorAll('input[type="radio"]')
radio.forEach(input => {
   input.addEventListener('change', (e) => {
      radio.forEach(r => document.querySelector(`#span-${r.id}`).classList.remove('active-radio'));

      document.querySelector(`#span-${input.id}`).classList.add('active-radio');
   })
})

// Handling form error and submit
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
   e.preventDefault()

   let formComplete = true

   const error = 'This field is required'
   const valueError = "This field can't be negative"

   const amount = document.querySelector('#amount').value
   const term = document.querySelector('#term').value
   const rate = document.querySelector('#rate').value
   const type = (document.querySelector('input[name="type"]:checked')) ? document.querySelector('input[name="type"]:checked').value : ''
   
   // Verifying if inputs are empty
   // Amount
   const docAmount = document.querySelector('#div-amount');
   const errorAmount = docAmount.querySelector('.error-label');

   if (amount === '' || amount < 0) {
      if (!errorAmount) { 
         const errorElement = document.createElement('p');
         errorElement.classList.add('error-label');
         errorElement.innerHTML = (amount === '') ? error : valueError;
         docAmount.appendChild(errorElement);
      }
      docAmount.classList.add('error-input');
      formComplete = false;
   } else {
      if (errorAmount) errorAmount.remove(); 
      docAmount.classList.remove('error-input');
   }

   // Term
   const docTerm = document.querySelector('#div-term')
   const errorTerm = docTerm.querySelector('.error-label')

   if (term === '' || term < 0) {
      if (!errorTerm) {
         const errorElement = document.createElement('p');
         errorElement.classList.add('error-label');
         errorElement.innerHTML = (term === '') ? error : valueError;
         docTerm.appendChild(errorElement)
      }
      docTerm.classList.add('error-input')
      formComplete = false
   } else {
      if (errorTerm) errorTerm.remove()
      docTerm.classList.remove('error-input')
   }

   // Rate
   const docRate = document.querySelector('#div-rate')
   const errorRate = docRate.querySelector('.error-label')

    if (rate === '' || rate < 0) {
      if (!errorRate) {
         const errorElement = document.createElement('p');
         errorElement.classList.add('error-label');
         errorElement.innerHTML = (rate === '') ? error : valueError;
         docRate.appendChild(errorElement)
      }
      docRate.classList.add('error-input')
      formComplete = false
   } else {
      if (errorRate) errorRate.remove()
      docRate.classList.remove('error-input')
   }

   // Type
   const docType = document.querySelector('#div-type')
   const errorType = docType.querySelector('.error-label')

    if (type === '') {
      if (!errorType) {
         const errorElement = document.createElement('p');
         errorElement.classList.add('error-label');
         errorElement.innerHTML = error;
         docType.appendChild(errorElement)
      }
      formComplete = false
   } else if (errorType) errorType.remove()

   if(formComplete === false){
      return
   }
   
   const interetMensuel = (rate/100) / 12
   console.log(interetMensuel)
   const nombreMensualite = term * 12
   console.log(nombreMensualite)
   const mensualite = (amount * interetMensuel) / (1 - (1 + interetMensuel)**(-nombreMensualite))
   console.log(mensualite)
   const total = (mensualite * nombreMensualite).toFixed(2)
   console.log(total)
   const interetTotal = (total - amount).toFixed(2)
   console.log(interetTotal)

   displayResults(total, interetTotal, mensualite.toFixed(2))
})

// Form reset
const reset = document.querySelector('#reset')
reset.addEventListener('click', e => {

   document.querySelectorAll('form div').forEach(div => {
      div.classList.remove('error-input')
      const errorType = div.querySelector('.error-label')
      if(errorType) errorType.remove()
   })

   radio.forEach(r => document.querySelector(`#span-${r.id}`).classList.remove('active-radio'));

   displayDefault()
})