class Music{
    constructor(audioPath) {
        this.audio = new Audio(audioPath);
       
    }
    // Play the audio
    play() {
        this.audio.play();
        // this.audio.setVolume(0.5);
    }
    
    //Pause the audio
    pause() {
        this.audio.pause();
    }
    
    //  stop the audio
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    
}