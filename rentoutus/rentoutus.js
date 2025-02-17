const completedMessage = 'Harjoitus päättyi! Toivottavasti olet nyt rentoutuneempi 🙂'
const breathInMessage = 'Hengitä sisään'
const breathOutMessage = 'Hengitä ulos'
const doAgainMessage = 'Tee harjoitus uudestaan'
let timeLeft = 60

const shapeContainer = document.getElementById('shapeContainer')
const startButton = document.getElementById('startButton')
const animatedShape = document.getElementById('animatedShape')
const messageContainer = document.getElementById('messageContainer')
const message = document.getElementById('message')

let interval
let counter = 4

function exerciseCompleted() {
    message.textContent = completedMessage
    startButton.style.display = 'inline-block'
    startButton.textContent = doAgainMessage
    animatedShape.className = ''
}

function changeAnimation() {
    if(animatedShape.className === 'growingShape') {
        animatedShape.className === 'shrinkingShape'
        counter = 6
    } else {
        animatedShape.className === 'growingShape'
        counter = 4
    }
}

function startExercise() {
    message.textContent = breathInMessage
    animatedShape.className = 'growingShape'

    // interval = setInterval(function() {
    //     message.textContent = ''
    //     message.textContent += 
    //         breathInMessage + ': ' + counter--

    //     if(counter === 0) {
    //         if(animatedShape.className === 'growingShape') {
    //             animatedShape.className === 'shrinkingShape'
    //             counter = 6
    //         } else {
    //             animatedShape.className === 'growingShape'
    //             counter = 4
    //         }
    //     }
    // }, 1000)

    animatedShape.addEventListener(
        'animationend',
        () => {
            if (animatedShape.className === 'growingShape') {
                timeLeft -= 4

                animatedShape.className = 'shrinkingShape'
                message.textContent = breathOutMessage
            } else {
                timeLeft -= 6

                animatedShape.className = 'growingShape'
                message.textContent = breathInMessage
            }

            if (timeLeft <= 0) {
                exerciseCompleted()
                return
            }
        })

}

startButton.onclick = () => {
    const messageContainer = document.getElementById('messageContainer')
    startButton.style.display = 'none'
    messageContainer.style.display = 'inline-block'

    let counter = 3

    message.textContent = counter

    interval = setInterval(function() {
        message.textContent = --counter

        if(counter < 0) {
            clearInterval(interval)
            message.textContent = ''
            startExercise()
        }
    }, 1000)
}