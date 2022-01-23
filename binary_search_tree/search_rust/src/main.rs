struct BinarySearchTree {
    val: i32,
    left: Option<Box<Self>>,
    right: Option<Box<Self>>,
}

impl BinarySearchTree {
    fn new() -> Self {
        BinarySearchTree { val: 0, left: None, right: None}
    }

    // /// 空の二分探索木をつくる。
    pub fn insert_all(&mut self, vec: Vec<i32>) {
        vec.first();
        if self.left.is_none() && self.right.is_none() && self.val == 0 {
            if let Some(root) = vec.first() {
                self.val = *root;
            }
        }
        for val in vec {
            Self::insert(self, val);
        }
    }

    fn insert(
        node: &mut BinarySearchTree,
        val: i32
    ) {
        if node.val > val {
            Self::inner_insert(&mut node.left, val);
        } else if node.val < val {
            Self::inner_insert(&mut node.right, val);
        } else {
            return;
        }
    }

    fn inner_insert(
        node: &mut Option<Box<Self>>,
        val: i32
    ) -> &mut Option<Box<Self>> {
        match node {
            Some(c_node) => if c_node.val > val {
                Self::inner_insert(&mut c_node.left, val)
            } else {
                Self::inner_insert(&mut c_node.right, val)
            },
            None => {
                *node = Option::from(Box::new(BinarySearchTree {
                    val: val, left: None, right: None
                }));
                return node
            }
        }
    }

    fn search(&mut self, val: i32) {
        if self.val > val {
            Self::inner_search(&self.left, val);
        } else if self.val < val {
            Self::inner_search(&self.right, val);
        } else {
            // println!("{} is found!", val);
        }
    }

    fn inner_search(
        node: &Option<Box<Self>>,
        val: i32
    ) -> &Option<Box<Self>> {
        if let Some(c_node) = node {
            if c_node.val > val {
                Self::inner_search(&c_node.left, val)
            } else if c_node.val < val {
                Self::inner_search(&c_node.right, val)
            } else {
                // println!("{} is found!", val);
                node
            }
        } else {
            // println!("{} is not found.", val);
            node
        }
    }
}

use std::fmt::*;


impl Display for BinarySearchTree {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{{val: {}}}", self.val).unwrap();
        Ok(())
    }
}


use std::fs::File;
use std::io::{BufRead, BufReader};
use std::time::Instant;

fn main() {
    let file = File::open("../data_1000000.txt").expect("no such file");
    let vec: Vec<i32> = BufReader::new(file).lines()
        .map(|l| l.expect("Could not parse line").parse().unwrap())
        .collect();
    let mut start = Instant::now();
    let mut bst = BinarySearchTree::new();
    bst.insert_all(vec);
    let mut end = start.elapsed();
    println!("二分探査木 生成: {}.{:09} ", end.as_secs(),end.subsec_nanos());

    start = Instant::now();
    for i in 0..10000000 {
        bst.search(i);
    }
    end = start.elapsed();
    println!("二分探査木 検索: {}.{:09} ", end.as_secs(),end.subsec_nanos());
}
