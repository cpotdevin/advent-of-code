with open('./08-input.txt') as file:
    lines = file.readlines()

    tree_heights = []
    for line in lines:
        tree_heights.append([int(c) for c in list(line.split('\n')[0])])

    max_scenic_score = 0
    for x in range(len(tree_heights)):
        for y in range(len(tree_heights[0])):
            up_score = 0
            for i in reversed(range(0, x)):
                up_score = up_score + 1
                if tree_heights[x][y] <= tree_heights[i][y]:
                    break

            right_score = 0
            for j in range(y + 1, len(tree_heights[0])):
                right_score = right_score + 1
                if tree_heights[x][y] <= tree_heights[x][j]:
                    break

            down_score = 0
            for i in range(x + 1, len(tree_heights)):
                down_score = down_score + 1
                if tree_heights[x][y] <= tree_heights[i][y]:
                    break

            left_score = 0
            for j in reversed(range(0, y)):
                left_score = left_score + 1
                if tree_heights[x][y] <= tree_heights[x][j]:
                    break

            max_scenic_score = max(
                    max_scenic_score,
                    up_score * right_score * down_score * left_score
            )

    print(max_scenic_score)
