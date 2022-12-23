const text = Deno.readTextFileSync("./01-input.txt");
const lines = text.split('\n');
let maxCalories = 0;
let currentCalories = 0;

for (const line of lines) {
  if (line === '') {
    maxCalories = Math.max(maxCalories, currentCalories);
    currentCalories = 0;
  } else {
    currentCalories += Number.parseInt(line);
  }
}

maxCalories = Math.max(maxCalories, currentCalories);

console.log('max calories: ' + maxCalories);
