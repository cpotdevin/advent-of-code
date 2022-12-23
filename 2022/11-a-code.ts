const input = Deno.readTextFileSync('./11-input.txt');

interface Monkey {
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
      itemsLine,
      operationLine,
      testLine,
      monkeyIfTrueLine,
      monkeyIfFalseLine,
    ] = monkeyInput.split('\n').slice(1);
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
      items,
      expression: { left, operation, right},
      test: { divisibleBy, monkeyIfTrue, monkeyIfFalse },
      inspectionCount: 0,
    };
  });

function getNewWorryLevel(monkey: Monkey, worryLevel: number): number {
  monkey.inspectionCount++;
  switch (monkey.expression.operation) {
    case '+': {
      if (monkey.expression.right === 'self') {
        return Math.floor((worryLevel + worryLevel) / 3);
      }
      return Math.floor((worryLevel + monkey.expression.right) / 3);
    }
    case '*': {
      if (monkey.expression.right === 'self') {
        return Math.floor((worryLevel * worryLevel) / 3);
      }
      return Math.floor((worryLevel * monkey.expression.right) / 3);
    }
    default: {
      throw new Error('Unrecognized operation');
    }
  }
}

function getNextMonkey(monkey: Monkey, worryLevel: number): number {
  if (worryLevel % monkey.test.divisibleBy === 0) {
    return monkey.test.monkeyIfTrue;
  }
  return monkey.test.monkeyIfFalse;
}

for (let n = 0; n < 20; n++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((worryLevel) => {
      const newWorryLevel = getNewWorryLevel(monkey, worryLevel);
      const nextMonkey = getNextMonkey(monkey, newWorryLevel);
      monkeys[nextMonkey].items.push(newWorryLevel);
    });
    monkey.items = [];
  });
}

monkeys.sort((a, b) => a.inspectionCount < b.inspectionCount ? 1 : -1);

console.log(monkeys[0].inspectionCount * monkeys[1].inspectionCount);
