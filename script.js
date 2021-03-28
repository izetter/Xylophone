
// Variables
let playback = [];
let isRecording = false;
const recording = [];
const buttons = document.querySelectorAll('#set > button');
const recBtn = document.querySelector('#rec');
const playBtn = document.querySelector('#play');
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
	if (/[wasdjklWASDJKL]/.test(evt.key)) eventHandler(evt);
})

document.addEventListener('keyup', (evt) => {
	if (/[wasdjklWASDJKL]/.test(evt.key)) eventHandler(evt);
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
					console.log(JSON.stringify(recording, null, 2));
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
					console.log(JSON.stringify(recording, null, 2));
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
			console.log(JSON.stringify(playback, null, 2));
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
	console.log(JSON.stringify(playback,null,2));
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
}
