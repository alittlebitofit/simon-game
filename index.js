let challengeArray = []
let userArray = []
let indexToCompare = 0
let gameLevel = 0

// this variable is just to avoid more keypresses during game
let gameInProgress = false

// starts game
function startGame() {
    // this is to avoid accidental new element being added to challenge-array
    if (!gameInProgress) {
        randomNumber()
        gameInProgress = true
    }
}

// adds click listener on divs
$('.btn').on('click tap', function(e) {
    let color = e.currentTarget.id
    userArray.push(color)
    compareArrays(color)
})


// generates random number
function randomNumber() {
    let random = Math.floor(Math.random() * 4)

    // using switch to add new element in challenge-array
    switch (random) {
        case 0:
            addToChallengeArray('green')
            break
        case 1:
            addToChallengeArray('red')
            break
        case 2:
            addToChallengeArray('yellow')
            break
        case 3:
            addToChallengeArray('blue')
            break
        default:
            break
    }
}

// this adds new element to challenge-array
function addToChallengeArray(color) {
    challengeArray.push(color)
    animate(color)
    gameLevel++
    $('#level-title').text('Level ' + gameLevel)
}

// plays sound and fades in and out
function animate(color) {
    playSound(color)
    fadeInOut(color)
}


// plays sound
function playSound(color) {
    try {
        let sound = new Audio('sounds/' + color + '.mp3')
        sound.play()
    } catch (err) {
        console.log('err: ', err)
        gameOver()
    }
}

// adds class for animation and removes after 100 milliseconds
function fadeInOut(color) {
    $('#' + color).addClass('fade')
    setTimeout(function() {
        $('#' + color).removeClass('fade')
    }, 100)
}


function compareArrays(color) {
    if (challengeArray.length === indexToCompare) {
        // do nothing here

        // this is just so the user can't click and cause game over
        // when the challenge-array is being modified
    } else if (challengeArray[indexToCompare] === userArray[indexToCompare]) {
        animate(color)
        indexToCompare++

        // this is when its time to add more to challenge array
        if (challengeArray.length === indexToCompare) {
            setTimeout(function() {
                userArray = []
                indexToCompare = 0
                randomNumber()
            }, 1000)
        }
    } else {
        gameOver()
    }
}


// this plays the game over sound and animation
function gameOver() {
    // change level title to game over
    $('#level-title').html('Game Over, Press <input type="button" class="button" value="This Button" onclick="startGame()"> to Restart')

    // play game over sound
    let gameOverSound = new Audio('sounds/wrong.mp3')
    gameOverSound.play()

    // animate game over background
    $('body').addClass('game-over-background')
    setTimeout(function() {
        $('body').removeClass('game-over-background')
    }, 200)

    // reset to default values
    resetValues()
}

// resets all values to default after game over
function resetValues() {
    challengeArray = []
    userArray = []
    indexToCompare = 0
    gameLevel = 0
    gameInProgress = false
}