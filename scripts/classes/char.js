// Class for the indivudual characters
// handles styling of the character
// and changing the character value
export default class Char {
    constructor(element, color, text) {
        this.element = element
        this.element.classList = color
        this.element.innerText = text
        this.element.instance = this
    }

    highlightRed() {
        this.element.classList = 'span--color-red'
    }
    highlightGreen() {
        this.element.classList = 'span--color-green'
    }
    highlightGrey() {
        this.element.classList = 'span--color-highlight'
    }
    highlightWhite() {
        this.element.classList = 'span--color-white'
    }
    crossCharacter() {
        this.element.classList = 'span--decoration-linethrouhg'
    }
    setDefaultColor() {
        this.element.classList = 'span--color-default'
    }
}