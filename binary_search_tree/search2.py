from typing import Optional, List
import time

class BST:
    def __init__(self, number_list: List[int]):
        if len(number_list) <= 0: return
        N_MAX = 1000000000
        self.root: int = number_list[0]
        self.left: List[int] = [None]*N_MAX
        self.right: List[int] = [None]*N_MAX
        for node in number_list[1:]:
            self.insert(node)

    def insert(self, value: int):
        current_value = self.root

        while True:
            if current_value > value:
                if self.left[current_value] is None:
                    self.left[current_value] = value
                    return
                current_value = self.left[current_value]
            elif current_value < value:
                if self.right[current_value] is None:
                    self.right[current_value] = value
                    return
                current_value = self.right[current_value]
            else:
                return

    def search(self, value: int):
        discoverd: bool = False
        lst: List[int] = [self.root]
        while len(lst) > 0:
            node = lst.pop()
            if node == value:
                discoverd = True
                break
            if self.left[node] is not None:
                lst.append(self.left[node])
            if self.right[node] is not None:
                lst.append(self.right[node])
        # if discoverd == True:
        #     print(str(value) + " is found!")
        # elif discoverd == False:
        #     print(str(value) + " is not found.")

if __name__ == '__main__':
    with open('data_1000000.txt', mode='r') as f:
        number_list = list(map(int, f.readlines()))
    time_sta = time.perf_counter()
    bst = BST(number_list)
    time_bst = time.perf_counter()
    print("二分探査木 生成:", time_bst-time_sta)
    # print(bst.search_max_depth())
    # 測定できないので100件
    for i in range(0, 10000000, 100000):
        bst.search(i)
    time_bst_search = time.perf_counter()
    print("二分探査木 検索:", time_bst_search-time_bst)
