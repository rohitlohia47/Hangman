const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figure = document.querySelectorAll('.figure-part')
const figureArr = [...figure]

let i = 0;

let wordsarr = ["ROHIT", "PROGRAMMING", "POPUP", "WORDS", "RANDOM"]
let selectedWord = wordsarr[Math.floor(Math.random() * wordsarr.length)]
let correctWords = [] //array to store the correct letters
let wrongWords = [] // array to strong the wrong letters



//functionto display word and display the win message if the user enters a correct word
const displayWOrds = () => {


    wordEl.innerHTML = `
    ${selectedWord
            .split('') //creating an array of string
            .map(letter => `<span class="letter">${correctWords.includes(letter) ? letter : ''}</span>`).join('')
        }
`
    let arr = []
    let elements = document.querySelectorAll('.letter')
    let elementsArr = [...elements]
    elementsArr.forEach((element) => {
        arr.push(element.innerText)
    })
    let arr2 = arr.join('')
    
    console.log(`${arr2}=${selectedWord}`);
    if (arr2 === selectedWord) {
       
        finalMessage.innerText = "You Have Won 😁😁"
        popup.classList.remove('hide')
        
       
    }




}

// function to display wrong words
const showWrongWords = (wrong) => {
    console.log("Wrong Words ", wrongWords);
    let wrongWordss = ''
    wrongWords.forEach(element => {
        wrongWordss += `${element},`
    })
    console.log(wrongWordss);
    wrongLettersEl.innerHTML = `<p>Wrong</p>
    <span>${wrongWordss}</span > `

    // make stickman parts visible one by one if the user enters wrong number
    figureArr[i].classList.remove('figure-part')
    i++;
    if (i == 6) {
        finalMessage.innerText = "You Have Lost 😁😁"
        popup.classList.remove('hide')
        
        
    }
}

// Show notification if the letter is already typed by the user
const showNotification = () => {
    notification.classList.add('show-notification')

    setTimeout(() => { notification.classList.remove('show-notification') }, 2000)
}

//event listener for key press 
window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 95) { //only listen to alphabetical keys

        if (selectedWord.includes(e.key.toUpperCase())) {
            if (!correctWords.includes(e.key.toUpperCase())) {
                correctWords.push(e.key.toUpperCase())
               
                displayWOrds();
            }
            else {
                showNotification();
            }

        }
        else if (!selectedWord.includes(e.key.toUpperCase())) {
            if (!wrongWords.includes(e.key.toUpperCase())) {

                wrongWords.push(e.key.toUpperCase())
                showWrongWords(e.key.toUpperCase());
            }
            else {
                showNotification();
            }
        }
    }
})

// reset everything and load new game whenever user type play again button
playAgainBtn.addEventListener('click', () => {
    popup.classList.add('hide')
    selectedWord = wordsarr[Math.floor(Math.random() * wordsarr.length)]
    figureArr.forEach((element)=> element.classList.add('figure-part'))
    correctWords = [];
    i=0;
    wrongWords = [];
    wrongLettersEl.innerHTML = '';
    displayWOrds();
    
})
displayWOrds(); 