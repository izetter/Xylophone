
// Variables
let playback = [];
let isRecording = false;
const recording = [];
const pressedKeys = {};
const buttons = document.querySelectorAll('#set > button');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');



// Event listeners
document.addEventListener('keydown', (evt) => {
	if (/[QWERTYUIOP]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

document.addEventListener('keyup', (evt) => {
	if (/[QWERTYUIOP]/i.test(evt.key) && evt.key.length === 1) eventHandler(evt);
})

for (let btn of buttons) {
	btn.addEventListener('click', (evt) => eventHandler(evt))
}

recBtn.addEventListener('click', record);

playBtn.addEventListener('click', playRecording);



// Functions
function eventHandler(evt) {

	const {type, key, currentTarget, timeStamp} = evt;
	const {id} = currentTarget;
	switch (type) {

		case 'click': {
			// The outer if statement here is to prevent 'click' while 'keydown' is happening.
			if (!pressedKeys[id]) {
				playSound(id);
				if (isRecording) {
					const sound = {key: id, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keydown': {
			if (!pressedKeys[key]) {
				playSound(key)
				pressedKeys[key] = true;
				if (isRecording) {
					const sound = {key, timeStamp};
					recording.push(sound);
				}
			}
			break;
		}

		case 'keyup': {
			pressedKeys[key] = false;
			break;
		}
	}
}


function record() {

	if (isRecording) {
		recBtn.classList.toggle('pressed');
		isRecording = false;

		// Creating array for playback without the initial delay from the original timeStamp while preserving the time differences between the events' original time stamps.
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
	for (let sound of playback) {
		setTimeout(() => {
			playSound(sound.key);
		}, sound.timeStamp);
	}
}


function playSound(Key) {
	let key = Key.toUpperCase();

	// Button animation
	let btn = document.querySelector(`#${key}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 100);

	// Audio playback
	let audio;
	switch (key) {

		case 'Q': {
			audio = new Audio('./sounds/C4.wav');
			break;
		}

		case 'W': {
			audio = new Audio('./sounds/D4.wav');
			break;
		}

		case 'E': {
			audio = new Audio('./sounds/E4.wav');
			break;
		}

		case 'R': {
			audio = new Audio('./sounds/F4.wav');
			break;
		}

		case 'T': {
			audio = new Audio('./sounds/G4.wav');
			break;
		}

		case 'Y': {
			audio = new Audio('./sounds/A4.wav');
			break;
		}

		case 'U': {
			audio = new Audio('./sounds/B4.wav');
			break;
		}

		case 'I': {
			audio = new Audio('./sounds/C5.wav');
			break;
		}

		case 'O': {
			audio = new Audio('./sounds/D5.wav');
			break;
		}

		case 'P': {
			audio = new Audio('./sounds/E5.wav');
			break;
		}




	} 
	audio.play();
}
