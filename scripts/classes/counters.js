// a Class to collect all the 'counters' and helper variables
// overflow -> counts the characters that were typed after the expected word
// input -> the typed in characters until Space is received
// timer -> the setInterval ID of the timer Class
// isRunning -> a boolean to keep track whether the timer was started
// charPosition -> tracks the expected char in the text to type
export default class Counters {
    constructor(overflow = 0, char = 0, input = '', timer = '', isRunning = false) {
        this.overflow = overflow
        this.input = input
        this.timer = timer
        this.isRunning = isRunning
        this.charPosition = char
    }

    resetCounters() {
        this.overflow = 0
        this.input = ''
        this.timer = ''
        this.isRunning = false
        this.charPosition = 0
    }
}