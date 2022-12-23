const input = Deno.readTextFileSync('./07-input.txt');

interface Directory {
  parent?: Directory;
  name: string;
  directories: Map<string, Directory>;
  fileSize: number;
  totalSize: number;
}

function createNewDirectory(name: string, parent?: Directory): Directory {
  return { parent, name, directories: new Map(), fileSize: 0, totalSize: 0 };
}

const root = createNewDirectory('/');
let currentDirectory = root;

input.split('$')
  .map((command) => command.trim())
  .forEach((command) => {
    if (command === 'cd /') {
      currentDirectory = root;
    } else if (command === 'cd ..') {
      if (currentDirectory.parent === undefined) {
        throw new Error('Directory did not have parent');
      }
      currentDirectory = currentDirectory.parent;
    } else if (command.startsWith('cd')) {
      const directoryName = command.split(' ')[1];
      const nextDirectory = currentDirectory.directories.get(directoryName);
      if (nextDirectory === undefined) {
        throw new Error('Directory did not have parent');
      }
      currentDirectory = nextDirectory;
    } else if (command.startsWith('ls')) {
      command.split('\n')
        .slice(1)
        .forEach((dirOrFile) => {
          if (dirOrFile.startsWith('dir')) {
            const name = dirOrFile.split(' ')[1];
            currentDirectory.directories.set(
              name,
              createNewDirectory(name, currentDirectory),
            );
          } else {
            const [sizeString] = dirOrFile.split(' ');
            const size = Number.parseInt(sizeString);
            currentDirectory.fileSize += size;
          }
        });
    }
  });

function calculateSize(dir: Directory): void {
  let totalSize = dir.fileSize;
  for (const value of dir.directories.values()) {
    calculateSize(value);
    totalSize += value.totalSize;
  }
  dir.totalSize = totalSize;
}

calculateSize(root);

const missingSpace = 30_000_000 - (70_000_000 - root.totalSize);

const dirSizes: Array<number> = [];
const dirsToVisit = [root];
while (dirsToVisit.length > 0) {
  const currentDir = dirsToVisit.pop();
  if (currentDir === undefined) {
    throw new Error('No dir to read');
  }
  dirSizes.push(currentDir.totalSize);
  for (const value of currentDir.directories.values()) {
    dirsToVisit.push(value);
  }
}

dirSizes.sort((a, b) => a < b ? -1 : 1);

const dirToDeleteSize = dirSizes.find((size) => size > missingSpace);
console.log(dirToDeleteSize);
