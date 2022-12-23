def get_points_for_shape(shape):
    if shape == 'X':
        return 1
    if shape == 'Y':
        return 2
    if shape == 'Z':
        return 3


def get_points_for_outcome_of_round(elf, me):
    if me == 'X':
        if elf == 'A':
            return 3
        if elf == 'B':
            return 0
        if elf == 'C':
            return 6
    if me == 'Y':
        if elf == 'A':
            return 6
        if elf == 'B':
            return 3
        if elf == 'C':
            return 0
    if me == 'Z':
        if elf == 'A':
            return 0
        if elf == 'B':
            return 6
        if elf == 'C':
            return 3


def get_points_for_round(elf, me):
    return get_points_for_shape(me) + get_points_for_outcome_of_round(elf, me)


score = 0

with open('02-input.txt') as f:
    lines = f.readlines()
    for line in lines:
        shapes = line.strip().split(' ')
        score = score + get_points_for_round(shapes[0], shapes[1])

print(score)
