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
    console.log(result)
    let message = finalMessage(result)
    console.log(message)

    rpsFrontEnd(humanChoice, message, botChoice)
}

function decideWinner(yourChoice, computerChoice){
    console.log(yourChoice)
    console.log(computerChoice)
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

function finalMessage([yourChoice,computerChoice]){
    // console.log(yourChoice)
    if(yourChoice == 1){
        return {'message':"You've Won", 'color':'green'}
    } else if(yourChoice  == 0.5){
        return {'message':"You've Draw", 'color':'yellow'}
    } else{
        return {'message':"You've Lost",'color': 'red'}
    }
}

function rpsFrontEnd(yourChoice, message, computerChoice){
    let imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //let's remove all the images when clicked
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()

    //let's create a div
    let humanDiv = document.createElement('div')
    let messageDiv = document.createElement('div')
    let botDiv = document.createElement('div')

    humanDiv.innerHTML =  "<img src='" + imageDatabase[yourChoice]+"' width='150px' height='150px' alt='' style='box-shadow:0px 10px 50px rgba(37,50,233,1)'></img>";
    messageDiv.innerHTML = "<h1 style='color: " + message['color'] + "; font-size:60px; padding:30px;'>" + message['message']+ "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[computerChoice]+"' width='150px' height='150px' alt='' style='box-shadow:0px 10px 50px rgba(37,50,233,1)'></img>";
    
    // let's append the div into html
    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
}