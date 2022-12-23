with open('./10-input.txt') as file:
    lines = file.readlines()

    cycle = 0
    x = 1
    crt = [['.'] * 40 for _ in range(6)]
    for line in lines:
        if x - 1 <= cycle % 40 and cycle % 40 <= x + 1:
            crt[int(cycle / 40)][cycle % 40] = '#'
        cycle = cycle + 1

        if line.strip() != 'noop':
            instruction = line.strip().split(' ')
            v = int(instruction[1])
            if x - 1 <= cycle % 40 and cycle % 40 <= x + 1:
                crt[int(cycle / 40)][cycle % 40] = '#'
            cycle = cycle + 1
            x = x + v

    for line in crt:
        print(''.join(line))
