
const words: Array<string> = (await Deno.readTextFile("./cleaned.txt")).split('\n');

// clean words to remove non 5 and invalid chars
const wordsCleaned = words.filter(word =>{
  if (word.length != 5) return false
  if (word.split('').some(letter => letter.toUpperCase() === letter)) return false
  return true
})

// write words to file
await Deno.writeTextFile("cleaned.txt", wordsCleaned.join('\n'));

// letter count
const letterRanking = new Map<string, number>()
words.map(word => {
  word.split('').map(letter => {
    letterRanking.set(letter, (letterRanking.get(letter) ?? 0) + 1)
  })
})

// rank words -- not the best heuristics
function countRank(words: Array<string>) {
  return words.map(word => {
    const score = [...new Set(word.split(''))].reduce((sum, letter) => sum + (letterRanking.get(letter) ?? 0), 0)
    return [word, score] as [string, number];
  }).sort((a,b) => { return b[1] - a[1]; })
}
let wordsRanked = countRank(words)
// console.log(wordsRanked);

// parse -b flag
const bIndex = Deno.args.indexOf("-b");
const black: Array<string> = [];
if (bIndex !== -1 && Deno.args[bIndex + 1]) {
  black.push(...Deno.args[bIndex + 1]);
}

// parse -y flag
const yIndex = Deno.args.indexOf("-y");
const yPositions: Array<string> = [];
if (yIndex !== -1) {
  for (let i = yIndex + 1; i < Deno.args.length; i++) {
    const arg = Deno.args[i];
    if (arg.startsWith("-")) break;
    yPositions.push(arg);
  }
}

// parse -g flag
const gIndex = Deno.args.indexOf("-g");
const greenWord: Array<string> = [];
if (gIndex !== -1 && Deno.args[gIndex + 1]) {
  greenWord.push(...Deno.args[gIndex + 1]);
}

// filter based on flag conditions
wordsRanked = wordsRanked.filter(([word]) => {
  // remove words without yello
  const uniqueYs = [...new Set(yPositions.map(item => item[0]))]
  if (uniqueYs.length && !uniqueYs.every(y => word.includes(y[0]))) return false;

  // check if any letters violate the flags
  return !word.split('').some((letter, index) => {
    if (black.includes(letter)) return true; // has excluded letters
    if (yPositions.length && yPositions.includes(`${letter}${index}`)) return true; // has position violation

    // green letter check
    if (greenWord && index < greenWord.length) {
      const greenChar = greenWord[index];
      const isLetter = greenChar.toLowerCase() !== greenChar.toUpperCase();
      if (isLetter && word[index] !== greenChar) return true; // green mismatch
    }
    return false;
  });
})

console.log(wordsRanked.map(word => word[0]))

