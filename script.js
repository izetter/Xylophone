
// Variables
let isRecording = false;
const buttons = document.querySelectorAll('#set > button');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');
const recording = [];
const pressedKeys = {
	w: false,
	a: false,
	s: false,
	d: false,
	j: false,
	k: false,
	l: false
}



// Event listeners
document.addEventListener('keydown', (evt) => {
	if (/[wasdjklWASDJKL]/.test(evt.key)) keyboardEventHandler(evt);
})

document.addEventListener('keyup', (evt) => {
	if (/[wasdjklWASDJKL]/.test(evt.key)) keyboardEventHandler(evt);
})

for (let btn of buttons) {
	btn.addEventListener('click', (evt) => playSound(evt.currentTarget.id))
}
 
recBtn.addEventListener('click', record);

playBtn.addEventListener('click', playRecording);



// Functions
function keyboardEventHandler(evt) {

	const {type, key} = evt;
	switch (type) {

		case 'keydown': {
			if (!pressedKeys[key]) {
				playSound(key)
				pressedKeys[key] = true;
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
	(isRecording) ? isRecording = false : isRecording = true;
	if (recording.length !== 0) recording.length = 0;
	recBtn.classList.toggle('pressed');
	playBtn.disabled = false;
}


function playRecording() {
	isRecording = false;
	recBtn.classList.remove('pressed');
	const tempRecording = [...recording];
	const playbackInterval = setInterval(() => {
		playSound(tempRecording.shift());
		if (tempRecording.length === 0) clearInterval(playbackInterval);
	}, 250)
}


function playSound(Key) {
	let key = Key.toLowerCase();

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
