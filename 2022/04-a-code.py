def parse_section_string(section_string):
    number_string = section_string.split('-')
    return int(number_string[0]), int(number_string[1])


def section_contains_other(section, other):
    return section[0] <= other[0] and section[1] >= other[1]


sum = 0

with open('./04-input.txt') as file:
    lines = file.readlines()
    for line in lines:
        section_strings = line.strip().split(',')
        section1 = parse_section_string(section_strings[0])
        section2 = parse_section_string(section_strings[1])
        if (section_contains_other(section1, section2)
                or section_contains_other(section2, section1)):
            sum = sum + 1

print(sum)
