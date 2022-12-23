const input = Deno.readTextFileSync('./13-input.txt');

type Packet = Array<number | Packet>;

function packetsAreInOrder(a: Packet, b: Packet): boolean | undefined {
  let left = a.shift();
  let right = b.shift();
  while (left !== undefined && right !== undefined) {
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
    left = a.shift();
    right = b.shift();
  }

  if (left === undefined && right === undefined) {
    return;
  }

  if (left === undefined) {
    return true;
  }

  return false;
}

let sumOfInOrderIndices = 0;
input.trim()
  .split('\n\n')
  .forEach((packetPair, i) => {
    const [packet1, packet2] = packetPair.split('\n')
      .map((p) => JSON.parse(p) as Packet);
    if (packetsAreInOrder(packet1, packet2)) {
      sumOfInOrderIndices += i + 1;
    }
  });

console.log(sumOfInOrderIndices);
