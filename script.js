
// Variables
let playback = [];
let isRecording = false;
let sampleShuffler = 1;
const recording = [];
const pressedKeys = {};
const keys = document.querySelectorAll('.key');
const helpBtn = document.querySelector('.help');
const recBtn = document.querySelector('.rec');
const playBtn = document.querySelector('.play');
const playSampleBtn = document.querySelector('.sample');
const keyBindings = document.querySelectorAll('.key > p');
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
		timeStamp: 334.1
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
		timeStamp: 835.1
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
		timeStamp: 1336.1
	},
	{
		code: "KeyI",
		timeStamp: 1509
	},
	{
		code: "KeyT",
		timeStamp: 1509.1
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
		timeStamp: 1837.1
	}
];

const sample2 = [
	{
		code: "KeyR",
		timeStamp: 0
	},
	{
		code: "Digit6",
		timeStamp: 0.1
	},
	{
		code: "KeyI",
		timeStamp: 0.2
	},
	{
		code: "KeyR",
		timeStamp: 400
	},
	{
		code: "KeyI",
		timeStamp: 400.1
	},
	{
		code: "Digit0",
		timeStamp: 400.2
	},
	{
		code: "KeyR",
		timeStamp: 800
	},
	{
		code: "KeyU",
		timeStamp: 800.1
	},
	{
		code: "KeyO",
		timeStamp: 800.2
	},
	{
		code: "KeyR",
		timeStamp: 1400
	},
	{
		code: "Digit6",
		timeStamp: 1400.1
	},
	{
		code: "KeyI",
		timeStamp: 1400.2
	},
	{
		code: "KeyR",
		timeStamp: 1800
	},
	{
		code: "KeyI",
		timeStamp: 1800.1
	},
	{
		code: "Digit0",
		timeStamp: 1800.2
	},
	{
		code: "KeyR",
		timeStamp: 2200
	},
	{
		code: "KeyI",
		timeStamp: 2200.1
	},
	{
		code: "Digit0",
		timeStamp: 2200.2
	},
	{
		code: "KeyR",
		timeStamp: 2400
	},
	{
		code: "KeyU",
		timeStamp: 2400.1
	},
	{
		code: "KeyO",
		timeStamp: 2400.2
	},
	{
		code: "KeyR",
		timeStamp: 2600
	},
	{
		code: "KeyU",
		timeStamp: 2600.1
	},
	{
		code: "KeyO",
		timeStamp: 2600.2
	},
	{
		code: "KeyR",
		timeStamp: 2800
	},
	{
		code: "Digit6",
		timeStamp: 2800.1
	},
	{
		code: "KeyI",
		timeStamp: 2800.2
	}
];

/* 

The variables below were originally not necesary until the site was deployed with commit e4ba981 (tag: "working"). For reasons yet to be known, instead of caching the audio files,
the browser kept downloading the corresponding audio file every single time it needed to be played, which resulted in janky audio playback.
This of course wasn't an issue while building because files were available locally.

The solution, which was implemented on commit a0cbb67 (tag: "test1"), was to have the audio objects readily availabe by creating these 17 audio object variables and having the
playSound() play the corresponding one instead of creating a single audio object variable which was reassgined to the proper audio file every time playSound() was executed.
The solution also required to set an audio's currentTime to zero immediately before every time the audio needed to be played.

Perhaps, a more elegant solution would be to leave the code as it was before commit a0cbb67 (tag: "test1") and find a way to force the browser to cache and use the cached audio files.

*/

const G3 = new Audio('./sounds/G3.wav');	// Q
const A3 = new Audio('./sounds/A3.wav');	// W
const B3 = new Audio('./sounds/B3.wav');	// E
const C4 = new Audio('./sounds/C4.wav');	// R
const D4 = new Audio('./sounds/D4.wav');	// T
const E4 = new Audio('./sounds/E4.wav');	// Y
const F4 = new Audio('./sounds/F4.wav');	// U
const G4 = new Audio('./sounds/G4.wav');	// I
const A4 = new Audio('./sounds/A4.wav');	// O
const B4 = new Audio('./sounds/B4.wav');	// P

const G3sharp = new Audio('./sounds/G3sharp.wav');	// 2
const A3sharp = new Audio('./sounds/A3sharp.wav');	// 3
const C4sharp = new Audio('./sounds/C4sharp.wav');	// 5
const D4sharp = new Audio('./sounds/D4sharp.wav');	// 6
const F4sharp = new Audio('./sounds/F4sharp.wav');	// 8
const G4sharp = new Audio('./sounds/G4sharp.wav');	// 9
const A4sharp = new Audio('./sounds/A4sharp.wav');	// 0



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

playSampleBtn.addEventListener('click', playSample);

helpBtn.addEventListener('click', () => {
	helpBtn.classList.toggle('help-clicked')
	for (let element of keyBindings) {
		element.classList.toggle('hidden');
	}
})

recBtn.addEventListener('click', () => {
	recBtn.classList.toggle('rec-clicked');
	record();
});

playBtn.addEventListener('click', playRecording);


// Functions

/* About eventHandler()
THIS FUNCTION ACHIEVES THE FOLLOWING WANTED BEHAVIOR:

If the user holds down a keyboard key -thus playing the corresponding sound once-, do not allow that same sound/animation to be played again until the user releases the key. 
Neither by allowing the keydown event code to execute more than once before a keyup event occurs, nor by the user "doubling down" on a Xylophone key by using a different input method.
i.e. the user clicking on a button while the corresponding keyboard key is being held down. (same thing when holding a tap on a button on a touchscreen).

Notice the ` code ` property being destructured "outside" before switching by the type of event even though click events do not contain a ` code ` property. This does not throw errors because
by destructuring "outside", ` code ` actually becomes a property of the click event and it is initialized to undefined; We don't get any errors because ` code ` is not referenced/used at all 
in the click event switch case! the ` code ` property is only used by the ` keydown/keyup ` events.

*/

function eventHandler(evt) {
	const { type, code, currentTarget, timeStamp } = evt;
	const { id } = currentTarget;
	switch (type) {

		case 'click': {
			// The outer if statement here is to prevent 'click' while 'keydown' is happening.
			if (!pressedKeys[id]) {
				playSound(id);
				if (isRecording) {
					const sound = { code: id, timeStamp };
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
					const sound = { code, timeStamp };
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
		playSampleBtn.disabled = false;
		isRecording = false;
	} else {
		if (recording.length !== 0) recording.length = 0;
		if (!playBtn.disabled) playBtn.disabled = true;
		playSampleBtn.disabled = true;
		isRecording = true;
	}
}

function playRecording() {

	// Play the sounds on their tempo
	for (let sound of playback) {
		setTimeout(() => {
			playSound(sound.code);
		}, sound.timeStamp);
	}

	// Disable the REC button and make the play button look active while recorded melody is playing
	let playbackDuration = playback[playback.length - 1].timeStamp;
	playBtn.classList.toggle('play-clicked');
	recBtn.disabled = true;
	setTimeout(() => {
		playBtn.classList.toggle('play-clicked');
		recBtn.disabled = false;
	}, playbackDuration);
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

	// Disable REC and Play sample buttons while sample melody is playing
	let sampleDuration = sample[sample.length - 1].timeStamp;
	playSampleBtn.disabled = true;
	recBtn.disabled = true;
	setTimeout(() => {
		playSampleBtn.disabled = false;
		recBtn.disabled = false;
	}, sampleDuration);
}

function playSound(code) {

	// Button animation
	let btn = document.querySelector(`#${code}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 100);

	// Audio playback
	switch (code) {

		// Naturals
		case 'KeyQ': {
			G3.currentTime = 0;
			G3.play();
			break;
		}

		case 'KeyW': {
			A3.currentTime = 0;
			A3.play();
			break;
		}

		case 'KeyE': {
			B3.currentTime = 0;
			B3.play();
			break;
		}

		case 'KeyR': {
			C4.currentTime = 0;
			C4.play();
			break;
		}

		case 'KeyT': {
			D4.currentTime = 0;
			D4.play();
			break;
		}

		case 'KeyY': {
			E4.currentTime = 0;
			E4.play();
			break;
		}

		case 'KeyU': {
			F4.currentTime = 0;
			F4.play();
			break;
		}

		case 'KeyI': {
			G4.currentTime = 0;
			G4.play();
			break;
		}

		case 'KeyO': {
			A4.currentTime = 0;
			A4.play();
			break;
		}

		case 'KeyP': {
			B4.currentTime = 0;
			B4.play();
			break;
		}

		// Sharps
		case 'Digit2': {
			G3sharp.currentTime = 0;
			G3sharp.play();
			break;
		}

		case 'Digit3': {
			A3sharp.currentTime = 0;
			A3sharp.play();
			break;
		}

		case 'Digit5': {
			C4sharp.currentTime = 0;
			C4sharp.play();
			break;
		}

		case 'Digit6': {
			D4sharp.currentTime = 0;
			D4sharp.play();
			break;
		}

		case 'Digit8': {
			F4sharp.currentTime = 0;
			F4sharp.play();
			break;
		}

		case 'Digit9': {
			G4sharp.currentTime = 0;
			G4sharp.play();
			break;
		}

		case 'Digit0': {
			A4sharp.currentTime = 0;
			A4sharp.play();
			break;
		}
	}
}
