
// variable declarations
const keyboardButtons = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const overlayPage = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');

// event listener for start button
startButton.addEventListener('click', () => {
  overlayPage.style.display = 'none';
}); 

//phrases array
const gamePhrases = [
  'toronto raptors', 
  'atlanta hawks',
  'golden state warriors',
  'los angeles lakers',
  'los angeles clippers',
  'boston celtics',
  'brooklyn nets',
  'new york knicks',
  'chicago bulls',
  'indiana pacers'
];

/*
array has 10 values setting max at 10 since Math.floor is exclusive of the max value and inclusive
of the min which is 0 in this case.  Arrays are zero-based indexes so this should work to include
all values of the array (i.e. 0 - 9)
*/
function getRandomPhraseArray(array, max = 10) {
  let randomArrayPosition = Math.floor(Math.random() * Math.floor(max));
  let randomPhraseSplit = array[randomArrayPosition].toUpperCase().split('');
  return randomPhraseSplit;
};


function addPhraseToDisplay(array) {
  let ul = document.getElementById('phrase').firstElementChild;
  array.forEach( (element) => {
    let li = document.createElement('li');
    li.textContent = element;

    if (element !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }

    ul.appendChild(li);
  });
};


const randomPhraseArray = getRandomPhraseArray(gamePhrases);
addPhraseToDisplay(randomPhraseArray);


function checkLetter(pressedButton) {
  const phraseLetters = document.querySelectorAll('.letter');
  let letterFound;
  phraseLetters.forEach( (element) => {
    if (element.innerHTML === pressedButton) {
      element.classList.add('show');
      letterFound = element.innerHTML;
    }
  });

  if (letterFound) {
    return letterFound;
  } else {
    return null;
  }
};


keyboardButtons.addEventListener('click', (event) => {
  const buttonPressed = event.target;
  if (buttonPressed.tagName === 'BUTTON') {
    buttonPressed.classList.add('chosen');
    let buttonText = buttonPressed.textContent;
    const checkLetterResult = checkLetter(buttonText);

    if (checkLetterResult === null) {
      const ol = document.querySelector('.ol-element');
      const olFirstChild = ol.firstChild;
      let li = document.createElement('li');
      li.innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px"></img>';

      ol.removeChild(ol.lastElementChild);
      ol.insertBefore(li, olFirstChild);

      missed += 1;
    }
  }
});
