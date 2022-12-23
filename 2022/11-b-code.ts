const input = Deno.readTextFileSync('./11-input.txt');

interface Monkey {
  id: number;
  items: Array<number>;
  expression: {
    left: 'self';
    operation: string;
    right: number | 'self';
  };
  test: {
    divisibleBy: number;
    monkeyIfTrue: number;
    monkeyIfFalse: number;
  };
  inspectionCount: number;
}

const monkeys: Array<Monkey> = input.split('\n\n')
  .map((monkeyInput): Monkey => {
    const [
      idLine,
      itemsLine,
      operationLine,
      testLine,
      monkeyIfTrueLine,
      monkeyIfFalseLine,
    ] = monkeyInput.split('\n');
    const id = Number.parseInt(idLine.split(':')[0].split(' ')[1]);
    const items = itemsLine.split(':')[1].trim().split(', ').map((s) => Number.parseInt(s));
    const [operation, rightString]: Array<string | number> = operationLine.split('=')[1]
      .trim()
      .split(' ')
      .splice(1);
    const left = 'self';
    const right = Number.isNaN(Number.parseInt(rightString))
      ? 'self'
      : Number.parseInt(rightString);
    const divisibleBy = Number.parseInt(testLine.split(' ').splice(-1)[0]);
    const monkeyIfTrue = Number.parseInt(monkeyIfTrueLine.split(' ').splice(-1)[0]);
    const monkeyIfFalse = Number.parseInt(monkeyIfFalseLine.split(' ').splice(-1)[0]);
    return {
      id,
      items,
      expression: { left, operation, right},
      test: { divisibleBy, monkeyIfTrue, monkeyIfFalse },
      inspectionCount: 0,
    };
  });

const levels = monkeys.reduce<Array<number>>((a, m) => a.concat(m.items), []);
const monkeyLevels: Array<Array<number>> = [];

monkeys.forEach((m, i) => {
  levels.forEach((l, j) => {
    if (monkeyLevels[i] === undefined) {
      monkeyLevels[i] = [];
    }
    monkeyLevels[i][j] = l % m.test.divisibleBy;
  });
});

let id = 0;
monkeys.forEach((m) => {
  for (let i = 0; i < m.items.length; i++) {
    m.items[i] = id;
    id++;
  }
});

for (let n = 0; n < 10000; n++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      const itemId = monkey.items.shift();
      if (itemId === undefined) {
        throw new Error('Should not happen');
      }

      for (let i = 0; i < monkeys.length; i++) {
        let level = monkeyLevels[i][itemId];
        if (monkey.expression.operation === '+') {
          if (monkey.expression.right === 'self') {
            level += level;
          } else {
            level += monkey.expression.right;
          }
          level %= monkeys[i].test.divisibleBy;
        } else {
          if (monkey.expression.right === 'self') {
            level *= level;
          } else {
            level *= monkey.expression.right;
          }
          level %= monkeys[i].test.divisibleBy;
        }

        monkeyLevels[i][itemId] = level;
      }

      monkey.inspectionCount++;
      if (monkeyLevels[monkey.id][itemId] === 0) {
        monkeys[monkey.test.monkeyIfTrue].items.push(itemId);
      } else {
        monkeys[monkey.test.monkeyIfFalse].items.push(itemId);
      }
    }
  });
}

monkeys.sort((a, b) => a.inspectionCount < b.inspectionCount ? 1 : -1);

console.log(monkeys[0].inspectionCount * monkeys[1].inspectionCount);
