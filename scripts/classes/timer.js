// Class for the timer, that handles
// the starting and stopping of the timer

export default class Timer {
    constructor(element, value = `0:60`) {
        this.element = element
        this.element.innerText = value
        this.element.instance = this
    }

    setValue(value) {
        document.getElementById('paragraph__timer').innerText = value
    }

    startTimer() {
        let countDownDate = new Date().getTime() + 60000

        const ticking = setInterval(() => {
            let now = new Date().getTime()
            let distance = countDownDate - now
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setValue(formatSecond(seconds))
            if (distance < 0) {
                this.stopTimer(ticking)
                this.setValue(`0:00`)
                open('/chart.html', '_self')
                if (localStorage.getItem('progress')) {
                    let progress = JSON.parse(localStorage.getItem('progress'))
                    let index = parseInt([...Object.keys(progress)].pop()) + 1
                    progress = {
                        ...progress,
                        [index]: calculate()
                    }
                    localStorage.setItem('progress', JSON.stringify(progress))
                } else {
                    let progress = {
                        '1': calculate()
                    }
                    localStorage.setItem('progress', JSON.stringify(progress))
                }
            }
        }, 1000)
        return ticking
    }

    stopTimer(intervalId) {
        clearInterval(intervalId)
    }
}

function formatSecond(seconds) {
    let formattedSeconds = seconds.toString().padStart(2, 0)
    return `0:${formattedSeconds}`
}

// calculates the wpm and word accuracy values
function calculate() {
    const correctlyTypedWords = parseInt(localStorage.getItem('correct'))
    const total = parseInt(localStorage.getItem('total'))
    const wpm = correctlyTypedWords
    const accuracy = (correctlyTypedWords / total * 100).toFixed(2)
    return { wpm: wpm, accuracy: accuracy }
}