
// Variables
let playback = [];
let isRecording = false;
const recording = [];
const pressedKeys = {};
const keys = document.querySelectorAll('.key');
const helpBtn = document.querySelector('#help');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');
const playSampleMelodyBtn = document.querySelector('#sample');
const keyboardToXylophoneRefs = document.querySelectorAll('.key > p');

const sampleMelodyMarimba = [
    {
        Key: "E",
        timeStamp: 0
    },
    {
        Key: "Q",
        timeStamp: 167
    },
    {
        Key: "Y",
        timeStamp: 334
    },
    {
        Key: "P",
        timeStamp: 335
    },
    {
        Key: "Q",
        timeStamp: 501
    },
    {
        Key: "T",
        timeStamp: 668
    },
    {
        Key: "Y",
        timeStamp: 835
    },
    {
        Key: "P",
        timeStamp: 836
    },
    {
        Key: "T",
        timeStamp: 1002
    },
    {
        Key: "Q",
        timeStamp: 1169
    },
    {
        Key: "Y",
        timeStamp: 1336
    },
    {
        Key: "P",
        timeStamp: 1337
    },
    {
        Key: "I",
        timeStamp: 1509
    },
    {
        Key: "T",
        timeStamp: 1510
    },
    {
        Key: "Q",
        timeStamp: 1670
    },
    {
        Key: "T",
        timeStamp: 1837
    },
    {
        Key: "I",
        timeStamp: 1838
    }
];



// Event listeners

// playSampleMelodyBtn.addEventListener('click', () =>)

helpBtn.addEventListener('click', () => {
	for (let element of keyboardToXylophoneRefs) {
		element.classList.toggle('hidden');
	}
})

document.addEventListener('keydown', (evt) => {
	if (/[QWERTYUIOP]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

document.addEventListener('keyup', (evt) => {
	if (/[QWERTYUIOP]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

for (let key of keys) {
	key.addEventListener('click', (evt) => eventHandler(evt))
}

recBtn.addEventListener('click', record);

playBtn.addEventListener('click', playRecording);



// Functions
function eventHandler(evt) {

/*

THIS FUNCTION ACHIEVES THE FOLLOWING WANTED BEHAVIOR:

If the user holds down a keyboard key -thus playing the corresponding sound once-, do not allow that same sound/animation to be played again until the user releases the key. 

Neither by allowing the keydown event code to execute more than once before a keyup event occurs, nor by the user "doubling down" on a Xylophone key by using a different input method.
i.e. the user clicking on a button while the corresponding keyboard key is being held down. (same thing when holding a tap on a button on screen).


FUNCTION CODE NOTES:
Notice the "key" property being destructured "outside" before switching by the type of event even though click events do not contain a "key" property. This does not throw errors because
although on click events "key" is initialized to undefined, "key" is not referenced/used at all unless there's a keyboard event, in which case "key" is of course not undefined!

Conversely, let Key = key.toUpperCase(); is referencing the "key" property! so it has to be placed within keydown/keyup cases because if done outside it would throw an exception when click events occur!
(you cannot upper case an undefined...)

The uppercasing of the value of "key" is done so that the objects pushed into the pressedKeys array contain only upper case values in their "Key" property, and thus preventing "false positives"
due to different casing when checking if a keyboard key is pressed no matter if the user's caps lock is on or not.


CONSIDER REFACTOR:
Using evt.code instead of event.key would eliminate the need of uppercasing. It would require to change the ids of the html button elements and the cases of the switch statement of the
playSound() function. 'Q' would become 'KeyQ' no matter if caps was on or off. Just note that event.code may return unwanted values on other keyboard layouts, so in such case re read the docs.

*/

	const {type, key, currentTarget, timeStamp} = evt;
	const {id} = currentTarget;
	switch (type) {

		case 'click': {
			// The outer if statement here is to prevent 'click' while 'keydown' is happening.
			if (!pressedKeys[id]) {
				playSound(id);
				if (isRecording) {
					const sound = {Key: id, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keydown': {
			let Key = key.toUpperCase();
			if (!pressedKeys[Key]) {
				playSound(Key)
				pressedKeys[Key] = true;
				if (isRecording) {
					const sound = {Key, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keyup': {
			let Key = key.toUpperCase();
			pressedKeys[Key] = false;
			break;
		}
	}
}


function record() {

	if (isRecording) {
		recBtn.classList.toggle('pressed');
		isRecording = false;

		// Creating playback array that is without the initial delay from the original timeStamp while preserving the time differences between the events' original time stamps.
		// if statement to avoid enabling play button if user records no sound in between toggling of REC button.
		if (recording.length !== 0) {
			playback = [...recording];
			for (let i = 1; i < playback.length; i++) {
				playback[i].timeStamp -= playback[0].timeStamp;
			}
			playback[0].timeStamp = 0;
			playBtn.disabled = false;
		}
		
	} else {
		if (recording.length !== 0) recording.length = 0;
		if (!playBtn.disabled) playBtn.disabled = true;
		recBtn.classList.toggle('pressed');
		isRecording = true;
	}
}


function playRecording() {
	console.log(playback);
	for (let sound of playback) {
		setTimeout(() => {
			playSound(sound.Key);
		}, sound.timeStamp);
	}
}


function playSound(Key) {

	// Button animation
	let btn = document.querySelector(`#${Key}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 100);

	// Audio playback
	let audio;
	switch (Key) {

		case 'Q': {
			audio = new Audio('./sounds/G3.wav');
			break;
		}

		case 'W': {
			audio = new Audio('./sounds/A3.wav');
			break;
		}

		case 'E': {
			audio = new Audio('./sounds/B3.wav');
			break;
		}

		case 'R': {
			audio = new Audio('./sounds/C4.wav');
			break;
		}

		case 'T': {
			audio = new Audio('./sounds/D4.wav');
			break;
		}

		case 'Y': {
			audio = new Audio('./sounds/E4.wav');
			break;
		}

		case 'U': {
			audio = new Audio('./sounds/F4.wav');
			break;
		}

		case 'I': {
			audio = new Audio('./sounds/G4.wav');
			break;
		}

		case 'O': {
			audio = new Audio('./sounds/A4.wav');
			break;
		}

		case 'P': {
			audio = new Audio('./sounds/B4.wav');
			break;
		}
	} 
	audio.play();
}
