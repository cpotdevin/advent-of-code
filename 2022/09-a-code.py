with open('./09-input.txt') as file:
    lines = file.readlines()

    hx = hy = tx = ty = 0
    visited = {(0, 0): True}
    for line in lines:
        motion = line.strip().split(' ')
        direction = motion[0]
        steps = int(motion[1])

        for _ in range(steps):
            if direction == 'U':
                hy = hy + 1
            elif direction == 'R':
                hx = hx + 1
            elif direction == 'D':
                hy = hy - 1
            elif direction == 'L':
                hx = hx - 1

            if 1 < abs(hx - tx):
                tx = tx + (hx - tx) / 2
                if hy != ty:
                    ty = hy
            elif 1 < abs(hy - ty):
                ty = ty + (hy - ty) / 2
                if hx != tx:
                    tx = hx

            visited[(tx, ty)] = True

    print(len(visited))
