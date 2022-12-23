const input = Deno.readTextFileSync('./06-input.txt');

const markerLength = 14;
const lastSeen: Array<string> = [];
input.split('')
  .find((character, i) => {
    lastSeen.push(character);

    if (lastSeen.length === markerLength + 1) {
      lastSeen.shift();

      const set = new Set();
      lastSeen.forEach((l) => set.add(l));
      if (set.size === markerLength) {
        console.log(i + 1);
        return true;
      }
    }

    return false;
  });
