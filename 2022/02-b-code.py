def get_points_for_outcome_of_round(shape):
    if shape == 'X':
        return 0
    if shape == 'Y':
        return 3
    if shape == 'Z':
        return 6


def getPointsForShape(elf, result):
    if result == 'X':
        if elf == 'A':
            return 3
        if elf == 'B':
            return 1
        if elf == 'C':
            return 2
    if result == 'Y':
        if elf == 'A':
            return 1
        if elf == 'B':
            return 2
        if elf == 'C':
            return 3
    if result == 'Z':
        if elf == 'A':
            return 2
        if elf == 'B':
            return 3
        if elf == 'C':
            return 1


def get_points_for_round(elf, result):
    return (getPointsForShape(elf, result)
            + get_points_for_outcome_of_round(result))


score = 0

with open('02-input.txt') as f:
    lines = f.readlines()
    for line in lines:
        shapes = line.strip().split(' ')
        score = score + get_points_for_round(shapes[0], shapes[1])

print(score)
