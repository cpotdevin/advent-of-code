const input = Deno.readTextFileSync('./06-input.txt');

const lastSeen: Array<string> = [];
input.split('')
  .find((character, i) => {
    lastSeen.push(character);

    if (lastSeen.length === 5) {
      lastSeen.shift();

      const set = new Set();
      lastSeen.forEach((l) => set.add(l));
      if (set.size === 4) {
        console.log(i + 1);
        return true;
      }
    }

    return false;
  });
