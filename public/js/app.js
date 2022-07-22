const weatherForm = document.querySelector('form')
const locationInput = weatherForm.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${locationInput.value}`).then((response) => {
    response.json().then(({ forecast, location, address, error }) => {
        if(error) {
            messageOne.textContent = error
            return
        }

        messageOne.textContent = location
        messageTwo.textContent = forecast
    })
})
})