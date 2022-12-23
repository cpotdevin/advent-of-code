def parse_section_string(section_string):
    number_string = section_string.split('-')
    return int(number_string[0]), int(number_string[1])


def sections_overlap(a, b):
    if a[0] <= b[0] and b[0] <= a[1]:
        return True
    if a[0] <= b[1] and b[1] <= a[1]:
        return True
    if b[0] <= a[0] and a[1] <= b[1]:
        return True
    return False


sum = 0

with open('./04-input.txt') as file:
    lines = file.readlines()
    for line in lines:
        section_strings = line.strip().split(',')
        section1 = parse_section_string(section_strings[0])
        section2 = parse_section_string(section_strings[1])
        if sections_overlap(section1, section2):
            sum = sum + 1

print(sum)
