const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement
const GMAPS_API_KEY = 'AIzaSyDS2v9oBeTWLdjnaG0ZvVG1gYLxzmlVMGA';

function searchAddressHandler(event: Event){
  event.preventDefault()
  const enteredAddress = addressInput.value;

  // send this to Google's API
}

form.addEventListener('submit', searchAddressHandler)