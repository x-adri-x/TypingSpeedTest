export default async function getText() {
    try {
        const response = await fetch('https://poetrydb.org/linecount/12/lines.json')
            .then(response => response.json())
        const index = Math.floor(Math.random() * response.length + 1)
        const randomPoem = response[index]
        const lines = randomPoem.lines.filter(line => line !== '')
        const words = lines.reduce((acc, current) => acc.concat(` ${current}`)).split(' ').filter(word => word !== '--')
        const shuffledArray = shuffleArray(words)
        return shuffledArray.reduce((acc, current) => acc.concat(` ${current}`))
    } catch (error) {
        return 'error'
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    return arr
}