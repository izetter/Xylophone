
// Variables
let playback = [];
let isRecording = false;
let sampleShuffler = 1;
const recording = [];
const pressedKeys = {};
const keys = document.querySelectorAll('.key');
const helpBtn = document.querySelector('#help');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');
const playSampleBtn = document.querySelector('#sample');
const noteAndKeyRef = document.querySelectorAll('.key > p');
const sample1 = [
    {
        code: "KeyE",
        timeStamp: 0
    },
    {
        code: "KeyQ",
        timeStamp: 167
    },
    {
        code: "KeyY",
        timeStamp: 334
    },
    {
        code: "KeyP",
        timeStamp: 334
    },
    {
        code: "KeyQ",
        timeStamp: 501
    },
    {
        code: "KeyT",
        timeStamp: 668
    },
    {
        code: "KeyY",
        timeStamp: 835
    },
    {
        code: "KeyP",
        timeStamp: 835
    },
    {
        code: "KeyT",
        timeStamp: 1002
    },
    {
        code: "KeyQ",
        timeStamp: 1169
    },
    {
        code: "KeyY",
        timeStamp: 1336
    },
    {
        code: "KeyP",
        timeStamp: 1336
    },
    {
        code: "KeyI",
        timeStamp: 1509
    },
    {
        code: "KeyT",
        timeStamp: 1509
    },
    {
        code: "KeyQ",
        timeStamp: 1670
    },
    {
        code: "KeyT",
        timeStamp: 1837
    },
    {
        code: "KeyI",
        timeStamp: 1837
    }
];

const sample2 = [
    {
        code: "KeyR",
        timeStamp: 0
    },
    {
        code: "Digit6",
        timeStamp: 0
    },
    {
        code: "KeyI",
        timeStamp: 0
    },
    {
        code: "KeyR",
        timeStamp: 400
    },
    {
        code: "KeyI",
        timeStamp: 400
    },
    {
        code: "Digit0",
        timeStamp: 400
    },
    {
        code: "KeyR",
        timeStamp: 800
    },
    {
        code: "KeyU",
        timeStamp: 800
    },
    {
        code: "KeyO",
        timeStamp: 800
    },
    {
        code: "KeyR",
        timeStamp: 1400
    },
    {
        code: "Digit6",
        timeStamp: 1400
    },
    {
        code: "KeyI",
        timeStamp: 1400
    },
    {
        code: "KeyR",
        timeStamp: 1800
    },
    {
        code: "KeyI",
        timeStamp: 1800
    },
    {
        code: "Digit0",
        timeStamp: 1800
    },
    {
        code: "KeyR",
        timeStamp: 2200
    },
    {
        code: "KeyI",
        timeStamp: 2200
    },
    {
        code: "Digit0",
        timeStamp: 2200
    },
    {
        code: "KeyR",
        timeStamp: 2400
    },
    {
        code: "KeyU",
        timeStamp: 2400
    },
    {
        code: "KeyO",
        timeStamp: 2400
    },
    {
        code: "KeyR",
        timeStamp: 2600
    },
    {
        code: "KeyU",
        timeStamp: 2600
    },
    {
        code: "KeyO",
        timeStamp: 2600
    },
    {
        code: "KeyR",
        timeStamp: 2800
    },
    {
        code: "Digit6",
        timeStamp: 2800
    },
    {
        code: "KeyI",
        timeStamp: 2800
    }
];


// Event listeners
document.addEventListener('keydown', (evt) => {
	if (/[QWERTYUIOP2356890]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

document.addEventListener('keyup', (evt) => {
	if (/[QWERTYUIOP2356890]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

for (let key of keys) {
	key.addEventListener('click', (evt) => eventHandler(evt))
}

helpBtn.addEventListener('click', () => {
	for (let element of noteAndKeyRef) {
		element.classList.toggle('hidden');
	}
})

playSampleBtn.addEventListener('click', playSample);

recBtn.addEventListener('click', record);

playBtn.addEventListener('click', playRecording);


// Functions
function eventHandler(evt) {

/*
THIS FUNCTION ACHIEVES THE FOLLOWING WANTED BEHAVIOR:

If the user holds down a keyboard key -thus playing the corresponding sound once-, do not allow that same sound/animation to be played again until the user releases the key. 
Neither by allowing the keydown event code to execute more than once before a keyup event occurs, nor by the user "doubling down" on a Xylophone key by using a different input method.
i.e. the user clicking on a button while the corresponding keyboard key is being held down. (same thing when holding a tap on a button on screen).

Notice the ` code ` property being destructured "outside" before switching by the type of event even though click events do not contain a ` code ` property. This does not throw errors because
by destructuring "outside", ` code ` actually becomes a property of the click event and it is initialized to undefined; We don't get any errors because ` code ` is not referenced/used at all 
in the click event switch case! the ` code ` property is only used by the ` keydown/keyup ` events.

*/

	const {type, code, currentTarget, timeStamp} = evt;
	const {id} = currentTarget;
	switch (type) {

		case 'click': {
			// The outer if statement here is to prevent 'click' while 'keydown' is happening.
			if (!pressedKeys[id]) {
				playSound(id);
				if (isRecording) {
					const sound = {code: id, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keydown': {
			if (!pressedKeys[code]) {
				playSound(code)
				pressedKeys[code] = true;
				if (isRecording) {
					const sound = {code, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keyup': {
			pressedKeys[code] = false;
			break;
		}
	}
}

function record() {
	if (isRecording) {
		recBtn.classList.toggle('pressed');
		isRecording = false;

		// if statement to avoid enabling play button if user records no sound in between toggling of REC button.
		if (recording.length !== 0) {
			// Creating the playback array, which is to be without the initial delay from the original timeStamp while preserving the time differences between the events' original time stamps.
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
	for (let sound of playback) {
		setTimeout(() => {
			playSound(sound.code);
		}, sound.timeStamp);
	}
}

function playSample() {

	// Decide which of the two samples to play
	let sample = sample1;
	if (sampleShuffler % 2 === 0) sample = sample2;
	sampleShuffler++;

	// Play the sounds on their tempo
	for (let sound of sample) {
		setTimeout(() => {
			playSound(sound.code);
		}, sound.timeStamp);
	}

	// Disable REC and play sample buttons while sample melody is playing
	let sampleDuration = sample[sample.length - 1].timeStamp;
	recBtn.disabled = true;
	playSampleBtn.disabled = true;
    setTimeout(() => {
        recBtn.disabled = false;
        playSampleBtn.disabled = false;
    }, sampleDuration);
}

function playSound(code) {

	// Button animation
	let btn = document.querySelector(`#${code}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 100);

	// Audio playback
	let audio;
	switch (code) {

		// Naturals
		case 'KeyQ': {
			audio = new Audio('./sounds/G3.wav');
			break;
		}

		case 'KeyW': {
			audio = new Audio('./sounds/A3.wav');
			break;
		}

		case 'KeyE': {
			audio = new Audio('./sounds/B3.wav');
			break;
		}

		case 'KeyR': {
			audio = new Audio('./sounds/C4.wav');
			break;
		}

		case 'KeyT': {
			audio = new Audio('./sounds/D4.wav');
			break;
		}

		case 'KeyY': {
			audio = new Audio('./sounds/E4.wav');
			break;
		}

		case 'KeyU': {
			audio = new Audio('./sounds/F4.wav');
			break;
		}

		case 'KeyI': {
			audio = new Audio('./sounds/G4.wav');
			break;
		}

		case 'KeyO': {
			audio = new Audio('./sounds/A4.wav');
			break;
		}

		case 'KeyP': {
			audio = new Audio('./sounds/B4.wav');
			break;
		}

		// Sharps
		case 'Digit2': {
			audio = new Audio('./sounds/Gsharp3.wav');
			break;
		}

		case 'Digit3': {
			audio = new Audio('./sounds/Asharp3.wav');
			break;
		}

		case 'Digit5': {
			audio = new Audio('./sounds/Csharp4.wav');
			break;
		}

		case 'Digit6': {
			audio = new Audio('./sounds/Dsharp4.wav');
			break;
		}

		case 'Digit8': {
			audio = new Audio('./sounds/Fsharp4.wav');
			break;
		}

		case 'Digit9': {
			audio = new Audio('./sounds/Gsharp4.wav');
			break;
		}

		case 'Digit0': {
			audio = new Audio('./sounds/Asharp4.wav');
			break;
		}
	} 
	audio.play();
}
