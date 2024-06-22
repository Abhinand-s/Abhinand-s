import os
import re

def read_issue_body():
    with open(os.getenv('GITHUB_EVENT_PATH')) as f:
        event_data = f.read()
    return re.search(r'(?<=X:\s*)\d+', event_data).group(0), re.search(r'(?<=Y:\s*)\d+', event_data).group(0)

def read_game_board(file_path):
    with open(file_path, 'r') as file:
        return file.readlines()

def write_game_board(file_path, game_board):
    with open(file_path, 'w') as file:
        file.writelines(game_board)

def update_game_board(game_board, x, y):
    y = int(y) - 1
    x = int(x) - 1
    for idx, line in enumerate(game_board):
        if 'P' in line:
            game_board[idx] = line.replace('P', '.')
    target_line = game_board[y]
    if target_line[x] == 'W':
        print("Invalid move. The target position is a wall.")
        exit(1)
    else:
        game_board[y] = target_line[:x] + 'P' + target_line[x+1:]

def main():
    x, y = read_issue_body()
    game_board = read_game_board('README.md')
    update_game_board(game_board, x, y)
    write_game_board('README.md', game_board)

if __name__ == "__main__":
    main()
