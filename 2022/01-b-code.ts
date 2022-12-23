const text = Deno.readTextFileSync("./01-input.txt");
const lines = text.split('\n');
const elfCalories: Array<number> = [];
let currentCalories = 0;

for (const line of lines) {
  if (line === '') {
    elfCalories.push(currentCalories);
    currentCalories = 0;
  } else {
    currentCalories += Number.parseInt(line);
  }
}

elfCalories.push(currentCalories);
elfCalories.sort((a, b) => a < b ? 1 : -1);

console.log('three max calories sum: ' + (elfCalories[0] + elfCalories[1] + elfCalories[2]));
