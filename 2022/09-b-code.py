with open('./09-input.txt') as file:
    lines = file.readlines()

    kps = [None] * 10
    for i in range(10):
        kps[i] = [0, 0]

    visited = {(0, 0): True}
    for line in lines:
        motion = line.strip().split(' ')
        direction = motion[0]
        steps = int(motion[1])

        for _ in range(steps):
            if direction == 'U':
                kps[0][1] = kps[0][1] + 1
            elif direction == 'R':
                kps[0][0] = kps[0][0] + 1
            elif direction == 'D':
                kps[0][1] = kps[0][1] - 1
            elif direction == 'L':
                kps[0][0] = kps[0][0] - 1

            for i in range(1, 10):
                if (1 < abs(kps[i - 1][0] - kps[i][0])
                        and 1 < abs(kps[i - 1][1] - kps[i][1])):
                    kps[i][0] = kps[i][0] + (kps[i - 1][0] - kps[i][0]) / 2
                    kps[i][1] = kps[i][1] + (kps[i - 1][1] - kps[i][1]) / 2
                elif 1 < abs(kps[i - 1][0] - kps[i][0]):
                    kps[i][0] = kps[i][0] + (kps[i - 1][0] - kps[i][0]) / 2
                    if kps[i - 1][1] != kps[i][1]:
                        kps[i][1] = kps[i - 1][1]
                elif 1 < abs(kps[i - 1][1] - kps[i][1]):
                    kps[i][1] = kps[i][1] + (kps[i - 1][1] - kps[i][1]) / 2
                    if kps[i - 1][0] != kps[i][0]:
                        kps[i][0] = kps[i - 1][0]

            visited[(kps[9][0], kps[9][1])] = True

    print(len(visited))
