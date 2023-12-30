// Class for the span element that functions as the cursor
// handles the moving of the cursor
// and adjusting its position after validating a word
export default class Cursor {
    constructor(element, className, position = 0) {
        this.element = element
        this.element.className = className
        this.element.instance = this
        this.position = position
    }

    setId(id) {
        this.element.setAttribute('id', id)
    }

    resetPosition(letters, parentNode) {
        parentNode.removeChild(this.element)
        letters[0].before(this.element)
        this.position = 0
    }
    moveCursorForward(letters, parentNode) {
        parentNode.removeChild(this.element)
        letters[this.position + 1].before(this.element)
        this.position = this.position + 1
    }
    moveCursorBack(letters, parentNode) {
        parentNode.removeChild(this.element)
        letters[this.position - 1].before(this.element)
        this.position = this.position - 1
    }
    moveCursorToNextWord(letters, parentNode, wordLength, inputLength) {
        parentNode.removeChild(this.element)
        const index = this.position + (wordLength - inputLength)
        letters[index].after(this.element)
        this.position = index + 1
    }
}