const input = Deno.readTextFileSync('./07-input.txt');

interface Directory {
  parent?: Directory;
  directories: Map<string, Directory>;
  fileSize: number;
  totalSize: number;
}

function createNewDirectory(parent?: Directory): Directory {
  return { parent, directories: new Map(), fileSize: 0, totalSize: 0 };
}

const root = createNewDirectory();
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
            currentDirectory.directories.set(
              dirOrFile.split(' ')[1],
              createNewDirectory(currentDirectory),
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

function getSumOfDirectoriesWithAtMostSize(dir: Directory, size: number): number {
  let sum = dir.totalSize <= size ? dir.totalSize : 0;
  for (const value of dir.directories.values()) {
    sum += getSumOfDirectoriesWithAtMostSize(value, size);
  }
  return sum;
}

console.log(getSumOfDirectoriesWithAtMostSize(root, 100000));
