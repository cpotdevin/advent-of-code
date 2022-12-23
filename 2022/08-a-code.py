with open('./08-input.txt') as file:
    lines = file.readlines()

    tree_heights = []
    visible_trees = []
    for line in lines:
        tree_heights.append([int(c) for c in list(line.split('\n')[0])])
        visible_trees.append([False for _ in list(line.split('\n')[0])])

    for i in range(len(tree_heights)):
        max_height = -1
        for j in range(len(tree_heights[0])):
            if tree_heights[i][j] > max_height:
                visible_trees[i][j] = True
                max_height = tree_heights[i][j]

    for j in range(len(tree_heights[0])):
        max_height = -1
        for i in range(len(tree_heights)):
            if tree_heights[i][j] > max_height:
                visible_trees[i][j] = True
                max_height = tree_heights[i][j]

    last = len(tree_heights[0]) - 1
    for i in range(len(tree_heights)):
        max_height = -1
        for j in range(len(tree_heights[0])):
            if tree_heights[i][last - j] > max_height:
                visible_trees[i][last - j] = True
                max_height = tree_heights[i][last - j]

    last = len(tree_heights) - 1
    for j in range(len(tree_heights[0])):
        max_height = -1
        for i in range(len(tree_heights)):
            if tree_heights[last - i][j] > max_height:
                visible_trees[last - i][j] = True
                max_height = tree_heights[last - i][j]

    visible_count = 0
    for i in range(len(tree_heights)):
        for j in range(len(tree_heights[0])):
            if visible_trees[i][j]:
                visible_count = visible_count + 1

    print(visible_count)
