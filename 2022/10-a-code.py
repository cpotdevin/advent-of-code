with open('./10-input.txt') as file:
    lines = file.readlines()

    cycle = 0
    x = 1
    sum = 0
    for line in lines:
        if (cycle - 20) % 40 == 0:
            sum = sum + x * cycle
        cycle = cycle + 1

        if line.strip() != 'noop':
            instruction = line.strip().split(' ')
            v = int(instruction[1])
            cycle = cycle + 1
            if (cycle - 20) % 40 == 0:
                sum = sum + x * cycle
            x = x + v

    print(sum)
