const input = Deno.readTextFileSync("./05-input.txt");
const [startLayout, moves] = input.split('\n\n');

const stacks: Array<Array<string>> = [];

startLayout.split('\n')
  .slice(0, -1)
  .forEach((row) => {
    for (let i = 0; i < row.length; i += 4) {
      if (row[i + 1] !== ' ') {
        if (stacks[i / 4] === undefined) {
          stacks[i / 4] = [];
        }

        stacks[i / 4].unshift(row[i + 1]);
      }
    }
  });

moves.split('\n')
  .slice(0, -1)
  .forEach((move) => {
    let [count, startStack, endStack] = move.split(' ')
      .map((v) => Number.parseInt(v))
      .filter((v) => !Number.isNaN(v));
    startStack--;
    endStack--;

    if (stacks[endStack] === undefined) {
      stacks[endStack] = [];
    }

    stacks[endStack].push(...stacks[startStack].slice(-count));
    stacks[startStack].splice(stacks[startStack].length - count);
  });

console.log(stacks.map((stack) => stack.slice(-1)).join(''));
