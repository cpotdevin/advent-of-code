const input = Deno.readTextFileSync('./13-input.txt');

type Packet = Array<number | Packet>;

function packetsAreInOrder(a: Packet, b: Packet): boolean | undefined {
  let i = 0;
  for (; i < a.length && i < b.length; i++) {
    const left = a[i];
    const right = b[i];
    if (typeof left === 'number' && typeof right === 'number') {
      if (left < right) {
        return true;
      }
      if (left > right) {
        return false;
      }
    } else {
      const result = packetsAreInOrder(
        typeof left === 'number' ? [left] : left,
        typeof right === 'number' ? [right] : right,
      );
      if (result !== undefined) {
        return result;
      }
    }
  }

  if (i === a.length && i === b.length) {
    return;
  }

  if (i === a.length) {
    return true;
  }

  return false;
}

const packets = input.trim()
  .split('\n')
  .filter((l) => l.trim() !== '')
  .map((p) => JSON.parse(p) as Packet);

packets.push([[2]]);
packets.push([[6]]);

let dividerIndex1 = 0;
let dividerIndex2 = 0;

packets.sort((a, b) => packetsAreInOrder(a, b) ? -1 : 1);

packets.forEach((p, i) => {
  if (p.length === 1 && typeof p[0] !== 'number' && p[0].length === 1 && p[0][0] === 2) {
    dividerIndex1 = i + 1;
  }
  if (p.length === 1 && typeof p[0] !== 'number' && p[0].length === 1 && p[0][0] === 6) {
    dividerIndex2 = i + 1;
  }
});
console.log(dividerIndex1 * dividerIndex2);
