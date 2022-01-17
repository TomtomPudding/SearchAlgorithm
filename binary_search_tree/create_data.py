import random

if __name__ == '__main__':
    base_array = list(range(1000000))
    random_array = map(str, random.sample(base_array, 100000))
    with open('data_100000.txt', mode='w') as f:
        f.write('\n'.join(random_array))
