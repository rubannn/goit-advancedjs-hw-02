import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const elements = {
  delayInput: document.querySelector("input[name='delay']"),
  form: document.querySelector('form'),
  radioButtons: {
    fulfilled: document.querySelector("input[value='fulfilled']"),
    rejected: document.querySelector("input[value='rejected']"),
  },
};

/**
 * Creates a promise that resolves or rejects after specified delay
 * @param {string} state - Promise state ('fulfilled' or 'rejected')
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise} Promise that resolves or rejects after delay
 */
function createDelayedPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve('Success');
      } else {
        reject('Error');
      }
    }, delay);
  });
}

/**
 * Shows success toast message
 * @param {number} delay - Delay in milliseconds
 */
function showSuccessToast(delay) {
  iziToast.success({
    message: `Fulfilled promise in ${delay}ms`,
    closeOnClick: true,
    position: 'topRight',
    displayMode: 0,
    progressBar: false,
  });
}

/**
 * Shows error toast message
 * @param {number} delay - Delay in milliseconds
 */
function showErrorToast(delay) {
  iziToast.error({
    message: `Rejected promise in ${delay}ms`,
    closeOnClick: true,
    position: 'topRight',
    displayMode: 0,
    progressBar: false,
  });
}

/**
 * Handles form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const delay = parseInt(elements.delayInput.value);
  const promiseState = elements.radioButtons.fulfilled.checked
    ? 'fulfilled'
    : 'rejected';

  createDelayedPromise(promiseState, delay)
    .then(() => showSuccessToast(delay))
    .catch(() => showErrorToast(delay));
}

// Event Listeners
elements.form.addEventListener('submit', handleFormSubmit);
