const soundDiv = document.getElementById('nav-sound')
const natureSound = document.getElementById('nature-sound')

soundDiv.addEventListener('click', () => toggleSound(natureSound))

function toggleSound(sound) {
    sound.paused ? sound.play() : sound.pause()
    document.querySelector('.nav__sound-mute').style.display = sound.paused ? 'block' : 'none'
    document.querySelector('.nav__sound-play').style.display = sound.paused ? 'none' : 'block'
}
