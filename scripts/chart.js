document.addEventListener('DOMContentLoaded', () => {
    // target document elements
    const dialog = document.getElementById('block__dialog')
    const wpmValue = document.getElementById('paragraph__wpm-value')
    const accuracyValue = document.getElementById('paragraph__accuracy-value')
    const dialogParagraph = document.getElementById('paragraph__dialog-paragraph')
    const backHomeButton = document.getElementById('button__back-home')
    const dialogButton = document.getElementById('button__dialog-button')
    const chart = document.getElementById('chart')
    const data = JSON.parse(localStorage.getItem('progress'))
    // add event listener for the button on chart page to go back to index page
    backHomeButton.addEventListener('click', () => open('/index.html', '_self'))

    let labels
    let wpm
    let acc
    // grab data for the charts data and labels
    labels = createLabels()
    wpm = createWPMData()
    acc = createAccuracyData()

    // if the user already has statistics, than show that, 
    // along with the message about how they did compared to last time
    if (data) {
        if (Object.keys(data).length > 1) {
            dialog.showModal()
            showProgressMessage()
            document.addEventListener('click', closeDialogOnClickOutside)
        } else if (Object.keys(data).length === 1) {
            chart.style.display = 'none'
            dialogParagraph.style.display = 'none'
        }
        //if user does not have data, then inform them and show a button to go to index page
    } else {
        dialogButton.style.display = 'block'
        dialog.style.display = 'grid'
        dialog.showModal()
        showNoDataMessage()
        dialogButton.addEventListener('click', () => open('/index.html', '_self'))
    }

    // set the text for the statistics shown next to the chart
    wpmValue.innerText = wpm !== undefined ? wpm[wpm.length - 1] : 0
    accuracyValue.innerText = acc !== undefined ? `${acc[acc.length - 1]} %` : `0.00 %`

    // creates the Chart with multiple lines
    new Chart(chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    data: wpm,
                    fill: false,
                    borderColor: '#FECDA6',
                    tension: 0.1,
                    yAxisID: 'y'
                },
                {
                    data: acc,
                    fill: false,
                    borderColor: '#fef0e4',
                    tension: 0.1,
                    yAxisID: 'y1'
                },
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    })

    function createLabels() {
        if (data) {
            return [...Object.keys(data)]
        }
    }

    function createWPMData() {
        if (data) {
            return [...Object.values(data)].map(value => value.wpm)
        }
    }

    function createAccuracyData() {
        if (data) {
            return [...Object.values(data)].map(value => value.accuracy)
        }
    }

    // closes the dialog when clicked outside of it
    function closeDialogOnClickOutside(event) {
        // check if clicked element is not inside dialog
        if (event.target.nodeName !== 'P') {
            dialog.close()

            // remove event listener from document
            document.removeEventListener('click', closeDialogOnClickOutside);
        }
    }

    function showProgressMessage() {
        if (wpm[wpm.length - 1] < wpm[wpm.length - 2]) {
            dialogParagraph.innerHTML = 'Most success springs from an obstacle or failure <br> You will do better next time!'
        } else if (wpm[wpm.length - 1] > wpm[wpm.length - 2]) {
            dialogParagraph.innerHTML = 'Achieve, Celebrate, Repeat.<br>You did better than last time!'
        } else {
            dialogParagraph.innerHTML = 'You keep it steady!<br>Keep up the good work!'
        }
    }

    // handles when no previous tests were taken
    function showNoDataMessage() {
        dialogParagraph.innerHTML = 'Nothing to see here.'
    }
})