def get_item_priority(item):
    priority = ord(item) - 38
    if priority > 52:
        priority = priority - 58
    return priority


sum = 0

with open('03-input.txt') as f:
    rucksacks = f.readlines()
    dict1 = {}
    dict2 = {}

    for i, rucksack in enumerate(rucksacks):
        items = list(rucksack.strip())

        for item in items:
            if i % 3 == 0:
                dict1[item] = True
            if i % 3 == 1:
                dict2[item] = True
            if i % 3 == 2 and item in dict1 and item in dict2:
                sum = sum + get_item_priority(item)
                break

        if i % 3 == 2:
            dict1 = {}
            dict2 = {}

print(sum)
