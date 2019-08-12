
// variable declarations
const keyboardButtons = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlayPage = document.getElementById('overlay');
const overlayButton = document.querySelector('.btn__reset');
const ol = document.querySelector('.ol-element');
let missed = 0;

// event listener for overlay button
overlayButton.addEventListener('click', () => {
  if (overlayPage.classList.contains('start')) {
    overlayPage.style.display = 'none';
  } else {
    resetGame();
    overlayPage.style.display = 'none';
  }
});


//phrases array
const gamePhrases = [
  'toronto raptors', 
  'atlanta hawks',
  'golden state warriors',
  'houston rockets',
  'los angeles clippers',
  'boston celtics',
  'brooklyn nets',
  'new york knicks',
  'chicago bulls',
  'indiana pacers'
];


initializePhrase();

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
  let ul = phrase.firstElementChild;
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

function initializePhrase() {
  const randomPhraseArray = getRandomPhraseArray(gamePhrases);
  addPhraseToDisplay(randomPhraseArray);
};


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


function checkWin() {
  let numberOfLetters = document.querySelectorAll('.letter').length;
  let numberOfLettersShown = document.querySelectorAll('.show').length;
  let overlayTitle = document.querySelector('.title');

  if (numberOfLetters === numberOfLettersShown || missed >=5) {
    if (numberOfLetters === numberOfLettersShown) {
      overlayPage.className = 'win';
      overlayTitle.textContent = 'You Win!!!';
    } else if (missed >= 5) {
      overlayPage.className = 'lose';
      overlayTitle.textContent = 'Sorry! You Lose :(';
    }
    overlayButton.textContent = 'Play Again?';
    overlayPage.style.display = 'flex';
  }
};


keyboardButtons.addEventListener('click', (event) => {
  const buttonPressed = event.target;
  if (buttonPressed.tagName === 'BUTTON') {
    buttonPressed.classList.add('chosen');
    buttonPressed.setAttribute('disabled', '');
    let buttonText = buttonPressed.textContent;
    const checkLetterResult = checkLetter(buttonText);

    if (checkLetterResult === null) {
      const olFirstChild = ol.firstChild;
      let li = document.createElement('li');
      li.innerHTML = '<img src="images/basketball-icon-gray.png" height="45px" width="40px">';
      ol.removeChild(ol.lastElementChild);
      ol.insertBefore(li, olFirstChild);

      missed += 1;
    }
  }

  checkWin();
});


function resetGame() {
  keyboardButtons.innerHTML = `
    <div class="keyrow">
      <button>Q</button><button>W</button><button>E</button><button>R</button><button>T</button><button>Y</button><button>U</button><button>I</button><button>O</button><button>P</button>
    </div>
    <div class="keyrow">
      <button>A</button><button>S</button><button>D</button><button>F</button><button>G</button><button>H</button><button>J</button><button>K</button><button>L</button>
    </div>
    <div class="keyrow">
      <button>Z</button><button>X</button><button>C</button><button>V</button><button>B</button><button>N</button><button>M</button>
    </div>
  `;

  phrase.removeChild(phrase.firstElementChild);
  let ul = document.createElement('ul');
  phrase.appendChild(ul);
  ol.innerHTML = `
    <li class="tries"><img src="images/basketball-icon.png" height="45px" width="40px"></li>
    <li class="tries"><img src="images/basketball-icon.png" height="45px" width="40px"></li>
    <li class="tries"><img src="images/basketball-icon.png" height="45px" width="40px"></li>
    <li class="tries"><img src="images/basketball-icon.png" height="45px" width="40px"></li>
    <li class="tries"><img src="images/basketball-icon.png" height="45px" width="40px"></li>
  `;

  initializePhrase();
  missed = 0;
}