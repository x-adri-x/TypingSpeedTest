import {
  visualizeText,
  createCursor,
  getInput,
  handleBackspaceWithOverflow,
  handleBackspaceWithoutOverflow,
  handleCorrectCharacter,
  handleExpectedSpaceCharacter,
  handleUnexpectedSpaceCharacter,
  handleExtraInputCharacters,
  handleWrongInputCharacter,
} from "./utils.js"
import Word from "./classes/word.js"
import getText from "./text.js"
import Timer from "./classes/timer.js"
import Counters from "./classes/counters.js"

// try - catch for local Storage
// add const variable for timer
// variables for the localStorage keys
// fix data running out, grab at least 160 words
// format the time with dateTime functions

document.addEventListener("DOMContentLoaded", async () => {
  // target document elements
  const container = document.getElementById("block__text-container")
  const startParagraph = document.getElementById("paragraph__start")
  const hiddenParagraph = document.getElementById(
    "paragraph__hidden-instructions"
  )
  const seeProgressButton = document.getElementById("button__progress")
  const timerElement = document.getElementById("paragraph__timer")
  // add event listener for the button on index page to open the chart page on click
  seeProgressButton.addEventListener("click", () =>
    open("/chart.html", "_self")
  )
  // creating Class instances
  const timer = new Timer(timerElement)
  let counters = new Counters()
  // fetching the text from the API
  const text = await getText()
  let word
  let letterNodes
  let cursor
  let words
  // in case the text could not be fetched, and it returned error,
  // then show a message informing the user, else show the text
  if (text === "error") {
    const p = document.createElement("p")
    p.textContent = "Something went wrong, please reload the site or try later."
    container.append(p)
  } else {
    // split the text string into words and create Word class
    words = text.split(" ")
    word = new Word(words[0], 0, 0)
    // render the text as individual characters and create a cursor element
    visualizeText(text, container)
    letterNodes = container.childNodes
    cursor = createCursor()
    initialize()
  }

  // start listening to the keyboard input, highlight the current word
  // and store word count and correctly typed word count in local storage
  function initialize() {
    document.addEventListener("keydown", validateCharInput)
    letterNodes[cursor.position].before(cursor.element)
    word.highlightWord(cursor.position, container)
    localStorage.setItem("correct", 0)
    localStorage.setItem("total", 1)
  }

  // handles when Esc is pressed
  function restartTest() {
    letterNodes.forEach((node) => {
      if (node.className !== "cursor") {
        node.instance.setDefaultColor()
      }
    })
    word.replaceOriginalWord(container, counters.input)
    timer.stopTimer(counters.timer)
    timer.setValue("0:60")
    localStorage.setItem("correct", 0)
    localStorage.setItem("total", 1)
    cursor.resetPosition(letterNodes, container)
    word.changeExpectedWord(0, words[0], cursor.position)
    word.highlightWord(cursor.position, container)
    counters.resetCounters()
  }

  // handles all the validation logic
  function validateCharInput(event) {
    const key = getInput(event)
    if (counters.isRunning === false) {
      counters.timer = timer.startTimer()
      startParagraph.style.display = "none"
      hiddenParagraph.style.display = "block"
      counters.isRunning = true
    }

    if (!key) {
      return
    }

    if (key === "Enter") {
      restartTest()
    } else if (key === "Backspace" && cursor.position === 0) {
      return
    } else if (
      key === "Backspace" &&
      cursor.element.previousSibling.innerText === " "
    ) {
      return
    } else if (key === "Backspace" && counters.overflow > 0) {
      handleBackspaceWithOverflow(cursor, counters)
    } else if (key === "Backspace" && counters.overflow === 0) {
      handleBackspaceWithoutOverflow(cursor, counters, letterNodes, container)
    } else if (text[counters.charPosition] === key) {
      handleCorrectCharacter(cursor, counters, letterNodes, container, key)
    } else if (text[counters.charPosition] === " " && key === "Space") {
      handleExpectedSpaceCharacter(
        cursor,
        counters,
        word,
        letterNodes,
        container
      )
      jumpToNextWord()
    } else if (key === "Space") {
      handleUnexpectedSpaceCharacter(
        cursor,
        counters,
        word,
        letterNodes,
        container
      )
      jumpToNextWord()
    } else if (text[counters.charPosition] === " " && key !== "Space") {
      handleExtraInputCharacters(cursor, counters, key)
    } else if (text[counters.charPosition] !== key) {
      handleWrongInputCharacter(cursor, counters, letterNodes, container, key)
    }
  }

  // when Space is pressed changes the expected word to the
  // next one and highlights it
  function jumpToNextWord() {
    word.changeExpectedWord(
      word.position + 1,
      words[word.position + 1],
      cursor.position
    )
    counters.input = ""
    localStorage.setItem("total", word.position)
    word.highlightWord(cursor.position, container)
  }
})
