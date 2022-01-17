from typing import Optional, List
import time

class TreeNode:
    def __init__(self, value: int) -> None:
        self.value: int = value
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None


class BST:
    def __init__(self, number_list: List[int]):
        if len(number_list) <= 0: return
        self.root: Optional[TreeNode] = None
        for node in number_list:
            self.insert(node)

    def insert(self, value: int):
        current_node = self.root
        if current_node == None:
            self.root = TreeNode(value)
            return
        while True:
            current_value = current_node.value
            if current_value > value:
                if current_node.left is None:
                    current_node.left = TreeNode(value)
                    return
                current_node = current_node.left
            elif current_value < value:
                if current_node.right is None:
                    current_node.right = TreeNode(value)
                    return
                current_node = current_node.right
            else:
                return

    def search(self, value: int):
        discoverd: bool = False
        lst: List[TreeNode] = [self.root]
        while len(lst) > 0:
            node = lst.pop()
            if node.value == value:
                discoverd = True
                break
            if node.right is not None:
                lst.append(node.right)
            if node.left is not None:
                lst.append(node.left)
        if discoverd == True:
            print(str(value) + " is found!")
        elif discoverd == False:
            print(str(value) + " is not found.")

    def search_max_depth(self):
        return self.__search_depth(self.root)

    def __search_depth(self, node: TreeNode, depth: int = 0) -> int:
        # print(node.value, depth)
        if node.left is None and node.right is None:
            return depth
        max_depth = -1
        if node.left is not None:
            max_depth = self.__search_depth(node.left, depth+1)
        if node.right is not None:
            left_depth = self.__search_depth(node.right, depth+1)
            max_depth = left_depth if left_depth > max_depth else max_depth
        return max_depth

if __name__ == '__main__':
    with open('data_100000.txt', mode='r') as f:
        number_list = list(map(int, f.readlines()))
    time_sta = time.perf_counter()
    bst = BST(number_list)
    time_bst = time.perf_counter()
    print("二分探査木 生成:", time_bst-time_sta)
    # print(bst.search_max_depth())
    bst.search(998037)
    time_bst_search = time.perf_counter()
    print("二分探査木 検索:", time_bst_search-time_bst)
