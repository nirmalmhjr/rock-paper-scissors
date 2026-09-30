let humanScore = 0
let botScore = 0
let drawScore = 0

function getRandomNumber(){
    return Math.floor(Math.random()*3)
}

function getComputerChoice (){
    return ['rock','paper','scissors'][getRandomNumber()]
}

function rpsGame(yourChoice){
    let humanChoice, botChoice;

    humanChoice= yourChoice.id;
    botChoice = getComputerChoice()

    let result = decideWinner(humanChoice,botChoice)
    updateScore(result)
    let message = finalMessage(result)

    rpsFrontEnd(humanChoice, message, botChoice)
}

function decideWinner(yourChoice, computerChoice){
    let rpsDatabase = {
        'rock': {'paper':1, 'rock': 0.5,'scissors':0},
        'paper': {'scissors':1,'paper': 0.5,'rock':0},
        'scissors':{'rock':1,'scissors': 0.5,'paper':0}
    }

    let yourScore, computerScore
    yourScore= rpsDatabase[computerChoice][yourChoice]
    computerScore = rpsDatabase[yourChoice][computerChoice]

    return [yourScore, computerScore]
}

function updateScore([yourScore, computerScore]){
    if(yourScore == 1){
        humanScore++
    } else if(computerScore == 1){
        botScore++
    } else{
        drawScore++
    }

    showScores()
}

function showScores(){
    document.getElementById('human-score').textContent = humanScore
    document.getElementById('bot-score').textContent = botScore
    document.getElementById('draw-score').textContent = drawScore
}

function finalMessage([yourChoice,computerChoice]){
    if(yourChoice == 1){
        return {'message':"You Won!", 'color':'#1e9e5a'}
    } else if(yourChoice  == 0.5){
        return {'message':"It's a Draw", 'color':'#d98e04'}
    } else{
        return {'message':"You Lost", 'color': '#d64545'}
    }
}

function capitalize(word){
    return word[0].toUpperCase() + word.slice(1)
}

function rpsFrontEnd(yourChoice, message, computerChoice){
    let imageDatabase = {
        'rock': document.querySelector('#rock img').src,
        'paper': document.querySelector('#paper img').src,
        'scissors': document.querySelector('#scissors img').src
    }

    // highlight the card you picked
    document.querySelectorAll('.choice').forEach(function(card){
        card.classList.remove('selected')
    })
    document.getElementById(yourChoice).classList.add('selected')

    // show the result message
    let messageEl = document.getElementById('result-message')
    messageEl.textContent = message['message']
    messageEl.style.color = message['color']

    // show both picks side by side
    document.getElementById('human-pick').src = imageDatabase[yourChoice]
    document.getElementById('human-pick-name').textContent = 'You: ' + capitalize(yourChoice)
    document.getElementById('bot-pick').src = imageDatabase[computerChoice]
    document.getElementById('bot-pick-name').textContent = 'Computer: ' + capitalize(computerChoice)
    document.getElementById('matchup').hidden = false
}

function resetGame(){
    humanScore = 0
    botScore = 0
    drawScore = 0
    showScores()

    document.querySelectorAll('.choice').forEach(function(card){
        card.classList.remove('selected')
    })
    let messageEl = document.getElementById('result-message')
    messageEl.textContent = 'Make your move!'
    messageEl.style.color = ''
    document.getElementById('matchup').hidden = true
}
