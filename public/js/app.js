const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('.icon')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()



    if (input.value === 'Frusciante' || input.value === 'John Frusciante') {
        img.src = '/img/john.jpg'
        messageOne.textContent = "You're a God!"
        messageTwo.textContent = ''
        return
    } else if (input.value === 'Best programmer in the world') {
        img.src = '/img/eu.jpg'
        messageOne.textContent = "I'm a God!"
        messageTwo.textContent = ''
        return
    }


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    img.src = "/img/search.png"

    fetch('/weather?address=' + encodeURIComponent(input.value)).then((response) => {
        response.json().then((data) => {


            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                if (data.forecastData.temperature >= 20) {
                    img.src = "/img/sun.jpg"
                } else {
                    img.src = "/img/snow.png"
                }

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData.text

            }

        })
    })
})