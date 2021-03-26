
// Variables
let isRecording = false;
const buttons = document.querySelectorAll('#set > button');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');
const recording = [];
const keyStatus = {
	w: {
		isPressed: false
	},
	a: {
		isPressed: false
	},
	s: {
		isPressed: false
	},	
	d: {
		isPressed: false
	},
	j: {
		isPressed: false
	},
	k: {
		isPressed: false
	},
	l: {
		isPressed: false
	}
}


// Event listeners
document.addEventListener('keydown', (evt) => {
	keyPressed(evt.key);
})

document.addEventListener('keyup', (evt) => {
	keyPressed(evt.key);
	keyStatus[evt.key].isPressed = false;
})

for (let btn of buttons) {
	btn.addEventListener('click', (evt) => handler(evt.currentTarget.id))
}
 
recBtn.addEventListener('click', record);

playBtn.addEventListener('click', playRecording);


// Functions
function keyPressed(key) {
	if (/[wasdjklWASDJKL]/.test(key)) {
		if (!keyStatus[key].isPressed){
			handler(key.toLowerCase());
			keyStatus[key].isPressed = true;
		}
	}
}

function record() {
	(isRecording) ? isRecording = false : isRecording = true;
	recBtn.classList.toggle('pressed');
	playBtn.disabled = false;
}

function playRecording() {
	isRecording = false;
	recBtn.classList.remove('pressed');
	const tempRecording = [...recording];
	const playbackInterval = setInterval(() => {
		handler(tempRecording.shift());
		if (tempRecording.length === 0) clearInterval(playbackInterval);
	}, 250)
}

function handler(key) {

	// Button animation
	let btn = document.querySelector(`#${key}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 100);

	// Audio playback
	let audio;
	switch (key) {

		case 'w': {
			audio = new Audio('./sounds/crash.mp3');
			break;
		}

		case 'a': {
			audio = new Audio('./sounds/kick-bass.mp3');
			break;
		}

		case 's': {
			audio = new Audio('./sounds/snare.mp3');
			break;
		}

		case 'd': {
			audio = new Audio('./sounds/tom-1.mp3');
			break;
		}

		case 'j': {
			audio = new Audio('./sounds/tom-2.mp3');
			break;
		}

		case 'k': {
			audio = new Audio('./sounds/tom-3.mp3');
			break;
		}

		case 'l': {
			audio = new Audio('./sounds/tom-4.mp3');
			break;
		}
	} 
	audio.play();

	// Saving keys into the saved recording
	if (isRecording) {
		recording.push(key);
	}
}


// REFACTOR IN SUCH A WAY THAT YOU USE OBJECTS AND THERE ARE NO GLOBAL VARIABLES AND EVENT LISTENERS JUST CALL THE APPROPIEATE METHOD INSTEAD OF
// PERFORMING OPERATIONS THEMSELVES OTHER THAN SENDING THE (MAYBE ALREADY VALIDATED) INFORMATION NEEDED