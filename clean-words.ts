
// import words
const words = (await Deno.readTextFile("./words.txt")).split("\n");

const wordsCleaned = words.filter(word =>{
  if (word.length != 5) return false
  if (word.split('').some(letter => letter.toUpperCase() === letter)) return false
  return true
})

// write words to file
await Deno.writeTextFile("cleaned.txt", wordsCleaned.join('\n'));



