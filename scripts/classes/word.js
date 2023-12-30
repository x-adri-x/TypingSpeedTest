// Class for words
// handles:
// - changing of expected word (the next word to type)
// - highlighting the expected word
// - deciding if the typed in word was correct (validateWord)
// - crossing the word if it was not correctly typed (invalidateWord)
export default class Word {
    constructor(text, start = 0, position = 0) {
        this.text = text
        this.firstCharPosition = start
        this.position = position
    }

    changeExpectedWord(position, text, firstChar) {
        this.position = position
        this.text = text
        this.firstCharPosition = firstChar
    }

    highlightWord(cursor_position, container) {
        for (let i = cursor_position + 1; i < cursor_position + this.text.length + 1; i++) {
            container.childNodes[i].instance.highlightGrey()
        }
    }

    validateWord(end, container, input) {
        if (this.text === input) {
            for (let i = this.firstCharPosition; i < end; i++) {
                container.childNodes[i].instance.highlightWhite()
            }
            return true
        } else {
            let i = 0
            let end = input.length
            while (i < end) {
                if (this.text[i]) {
                    container.childNodes[i + this.firstCharPosition].instance.text = this.text[i]
                    container.childNodes[i + this.firstCharPosition].instance.crossCharacter()
                    i += 1
                } else {
                    container.childNodes[i + this.firstCharPosition].remove()
                    end -= 1
                }
            }
            return false
        }
    }

    // invalidates a word if Space/Esc/Enter was pressed before
    // word was fully typed in
    invalidateWord(container, input) {
        if (input.length < this.text.length) {
            for (let i = this.firstCharPosition; i < this.firstCharPosition + this.text.length; i++) {
                container.childNodes[i].instance.crossCharacter()
            }
        }
    }
}