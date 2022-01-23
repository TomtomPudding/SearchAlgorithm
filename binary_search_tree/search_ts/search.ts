interface TreeNode<T> {
    value: T,
    left: TreeNode<T> | null,
    right: TreeNode<T> | null,
}

class BinaryTree<T> implements TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(
      dataList: T[],
      left: TreeNode<T> | null = null,
      right: TreeNode<T> | null = null,
    ) {
      if (dataList.length > 1) {
        this.value = dataList[0];
        this.addAll(dataList)
      } else {
        this.value = dataList[0];
        this.left = left;
        this.right = right;
      }
    }

    private addAll(dataList: T[]) {
      if (dataList.length <= 0) throw new Error("初期値が不正です");
      this.value = dataList[0];
      for (let data of dataList.slice(1)) {
          this.add(data);
      }
    }

    private add(data: T) {
        if (this.value > data) {
            if (this.left?.value != null) {
                let tree = new BinaryTree<T>([this.left.value], this.left.left, this.left.right);
                tree.add(data);
                this.left = tree;
            } else {
                this.left = { value: data, left: null, right: null};
            }
        } else if (this.value < data) {
            if (this.right?.value != null) {
                let tree = new BinaryTree<T>([this.right.value], this.right.left, this.right.right);
                tree.add(data);
                this.right = tree;
            } else {
                this.right = { value: data, left: null, right: null};
            }
        } else {
            console.log(this.value, data, "既に存在する値です")
        }
    }

    find(data: T): boolean {
      if (this.value > data) {
        if (this.left == null) return false;
        return new BinaryTree<T>([this.left.value], this.left.left, this.left.right).find(data)
      } else if (this.value < data) {
        if (this.right == null) return false;
        return new BinaryTree<T>([this.right.value], this.right.left, this.right.right).find(data)
      } else {
        return true;
      }
    }
}

import * as fs from 'fs';
import * as readline from "readline"

async function getDataList(file: string): Promise<number[]> {
  const stream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: stream
  });

  let dataList: number[] = []
  for await (const line of rl) {
    dataList.push(Number(line));
  }
  return dataList;
};

getDataList("data_1000000.txt").then((dataList) => {
  var startTime = Date.now();
  const tree = new BinaryTree(dataList);
  var endTime = Date.now();
  console.log("二分探査木 生成: ", (endTime - startTime)/1000);
  startTime = Date.now();
  for (let i = 0; i < 10000000; i++) {
    tree.find(i);
  }
  endTime = Date.now();
  console.log("二分探査木 検索: ", (endTime - startTime)/1000)
})
