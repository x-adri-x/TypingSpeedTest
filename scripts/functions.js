import Char from "./classes/char.js"
import Cursor from "./classes/cursor.js"

const modifiers = [
  "Alt",
  "Shift",
  "Control",
  "Meta",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "ArrowRight",
  "ArrowLeft",
  "ArrowDown",
  "ArrowUp",
  "Tab",
  "CapsLock",
  "Dead",
  "AltGraph",
  "NumLock",
  "Delete",
  "Insert",
]

// render the response from API as characters
export async function visualizeText(text, container) {
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span")
    const char = new Char(span, "span--color-default", text[i])
    container.appendChild(char.element)
  }
}

// creates a span, that will be the cursor element
export function createCursor() {
  const span = document.createElement("span")
  const cursor = new Cursor(span, "cursor")
  cursor.setId("cursor")
  return cursor
}

// handles the keyboard input
export function getInput(event) {
  const key = event.key
  if (key === "Escape") {
    event.preventDefault()
    location.reload()
  }
  if (event.code === "Space" || key === "Backspace") {
    return event.code
  } else if (modifiers.includes(key)) {
    return false
  } else {
    return key
  }
}

// handles case where Backspace was pressed and the input
// contains extra characters, e.g instead of 'cat'
// 'catdog' was typed
export function handleBackspaceWithOverflow(
  cursor,
  letters,
  container,
  counters
) {
  cursor.element.previousSibling.remove()
  counters.input = counters.input.slice(0, -1)
  cursor.position = cursor.position - 1
  counters.overflow = counters.overflow - 1
}

// handles case where Backspace was pressed and the input
// contains no extra characters, e.g for a word with
// 3 characters length, exactly 3 characters were typed
export function handleBackspaceWithoutOverflow(
  cursor,
  counters,
  letters,
  container
) {
  counters.input = counters.input.slice(0, -1)
  cursor.element.previousSibling.instance.highlightGrey()
  counters.charPosition = counters.charPosition - 1
  cursor.moveCursorBack(letters, container)
}

// handles case where the typed in character matches the expected character
export function handleCorrectCharacter(
  cursor,
  counters,
  letters,
  container,
  key
) {
  counters.input = counters.input + key
  letters[cursor.position + 1].instance.highlightGreen()
  counters.charPosition = counters.charPosition + 1
  cursor.moveCursorForward(letters, container)
}

// handles case when space was hit and space was expected
export function handleExpectedSpaceCharacter(
  cursor,
  counters,
  word,
  letters,
  container
) {
  if (word.validateWord(cursor.position, container, counters.input)) {
    const correct = parseInt(localStorage.getItem("correct")) + 1
    localStorage.setItem("correct", correct)
  }
  cursor.position = cursor.position - counters.overflow
  cursor.moveCursorForward(letters, container)
  counters.charPosition += 1
  counters.overflow = 0
}

// handles case when space is not expected but receives space input
export function handleUnexpectedSpaceCharacter(
  cursor,
  counters,
  word,
  letters,
  container
) {
  cursor.moveCursorToNextWord(
    letters,
    container,
    word.text.length,
    counters.input.length
  )
  counters.charPosition = cursor.position
  word.invalidateWord(container, counters.input)
}

// handles case when more characters are typed than it was expected
export function handleExtraInputCharacters(cursor, counters, key) {
  counters.input = counters.input + key
  const span = document.createElement("span")
  const char = new Char(span, "span--color-red", key)
  cursor.element.previousSibling.after(char.element)
  cursor.position = cursor.position + 1
  counters.overflow = counters.overflow + 1
}

// handles case when the typed in character is not what is expected
export function handleWrongInputCharacter(
  cursor,
  counters,
  letters,
  container,
  key
) {
  counters.input = counters.input + key
  letters[cursor.position + 1].instance.highlightRed()
  counters.charPosition = counters.charPosition + 1
  cursor.moveCursorForward(letters, container)
}
