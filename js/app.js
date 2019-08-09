
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
  let randomPhraseSplit = array[randomArrayPosition].split('');
  return randomPhraseSplit;
};


function addPhraseToDisplay(array) {
  let ul = document.getElementById('phrase').firstElementChild;
  array.forEach( (element) => {
    let li = document.createElement('li');
    li.textContent = element;

    if (element !== ' ') {
      li.className = 'letter';
    }

    ul.appendChild(li);
  });
};

