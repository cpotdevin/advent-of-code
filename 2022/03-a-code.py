def get_item_priority(item):
    priority = ord(item) - 38
    if priority > 52:
        priority = priority - 58
    return priority


sum = 0

with open('03-input.txt') as f:
    rucksacks = f.readlines()
    for rucksack in rucksacks:
        items = list(rucksack.strip())
        compartment1 = items[0: len(items)/2]
        compartment2 = items[len(items)/2:]
        dict = {}

        for item in compartment1:
            dict[item] = True

        for item in compartment2:
            if item in dict:
                sum = sum + get_item_priority(item)
                break

print(sum)
