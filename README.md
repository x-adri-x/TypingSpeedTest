# Speed Typing Test Web Page

Welcome to the Speed Typing Test Web Page project! This web page allows users to test their typing speed and accuracy in a timed session.

## Features

- **timer:** The timer starts when the user begins typing and runs for 60 seconds. After the timer expires, the user is redirected to a page displaying their statistics. Statistics will be shown as a chart if the user has more than 2 completed tests.

- **Backspace support:** Users can use the Backspace key to correct the current word they are typing. However, once the Space key is hit, the word is submitted and can no longer be changed.

- **statistics:** Users can view their typing statistics on the results page, including words per minute (WPM) and accuracy.

## Dependencies

- [Chart.js](https://www.chartjs.org/): The project uses Chart.js to visualize typing statistics.
- [PoetryDB](https://poetrydb.org/index.html): Public API to retrieve text data from

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/TuringCollegeSubmissions/alenar-FE.2.5.git
   ```
2. Install chart.js:

  ```bash
  npm install chart.js
  ```
3. Open the index.html file in a web browser to start the speed typing test.

4. After the timer expires, you will be automatically redirected to the results page (chart.html) to view your statistics.

## Project Structure

- index.html: The main HTML file for the speed typing test.
- chart.html: The results page displaying typing statistics.
- main.css: Stylesheet for the main CSS styles.
- desktop.css: Stylesheet for the desktop CSS styles
- scripts: folder containing the logic for the speed typing test.
- scripts/classes: folder containing the Javascript Classes used in the project
- scripts/index.js: main Javascript file for the index page
- scripts/chart.js: main Javascript file for the chart.html
- scripts/text.js: Javascript file handling the fetching of data from Public API
