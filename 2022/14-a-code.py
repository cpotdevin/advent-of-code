cave = dict()
max_y = 0

with open('./14-input.txt') as file:
    input = file.readlines()

    for line in input:
        edges = line.strip().split(' -> ')
        for currentStr, nextStr in zip(edges, edges[1:]):
            current = [int(v) for v in currentStr.split(',')]
            next = [int(v) for v in nextStr.split(',')]

            if current[0] != next[0]:
                for i in range(
                        min(current[0], next[0]),
                        max(current[0], next[0]) + 1):
                    cave[(i, current[1])] = True
                    max_y = max(max_y, current[1], next[1])
            else:
                for i in range(
                        min(current[1], next[1]),
                        max(current[1], next[1]) + 1):
                    cave[(current[0], i)] = True
                    max_y = max(max_y, current[1], next[1])


def next_sand_location(sand):
    x = sand[0]
    y = sand[1]

    down = (x, y + 1)
    if down not in cave or not cave[down]:
        return (x, y + 1)

    down_left = (x - 1, y + 1)
    if down_left not in cave or not cave[down_left]:
        return (x - 1, y + 1)

    down_right = (x + 1, y + 1)
    if down_right not in cave or not cave[down_right]:
        return (x + 1, y + 1)

    return (x, y)


def drop_sand():
    sand = (500, 0)
    next_sand = next_sand_location(sand)
    while sand != next_sand:
        sand = next_sand
        next_sand = next_sand_location(sand)
        if max_y < sand[1]:
            return False

    cave[sand] = True
    return True


units_dropped = 0
while drop_sand():
    units_dropped = units_dropped + 1

print(units_dropped)
