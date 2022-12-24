import re

sensors_and_beacons = []
with open('./15-input.txt') as file:
    lines = file.readlines()
    for line in lines:
        s_and_b = re.search(
            r'x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)',
            line,
        ).groups()
        sensors_and_beacons.append([
            (int(s_and_b[0]), int(s_and_b[1])),
            (int(s_and_b[2]), int(s_and_b[3]))
        ])


def get_manhattan_distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def is_within_manhattan_distance(a, b, distance):
    return get_manhattan_distance(a, b) <= distance


min_x = float('inf')
max_x = -float('inf')
sensors_and_distances = list()
beacons = set()
for s_and_b in sensors_and_beacons:
    s = s_and_b[0]
    b = s_and_b[1]
    manhattan_distance = (abs(s[0] - b[0]) + abs(s[1] - b[1]))
    min_x = min(min_x, s[0] - manhattan_distance)
    max_x = max(max_x, s[0] + manhattan_distance)
    sensors_and_distances.append((s, manhattan_distance))
    beacons.add(b)

y = 2000000
total = 0
x = min_x
while x <= max_x:
    for s_and_d in sensors_and_distances:
        if is_within_manhattan_distance(s_and_d[0], (x, y), s_and_d[1]):
            end_of_sensor_reach_x = s_and_d[0][0] \
                    + s_and_d[1] - abs(y - s_and_d[0][1])
            total = total + end_of_sensor_reach_x - x + 1
            x = end_of_sensor_reach_x
            break

    x = x + 1

for b in beacons:
    if b[1] == y:
        total = total - 1

print(total)
