pub struct BinarySearchTree<T: Ord>(
    BinarySearchTreeInner<T>,
);

#[derive(Debug, PartialEq, Eq)]
enum BinarySearchTreeInner<T: Ord> {
    Nil,
    Node {
        val: T,
        left: Box<Self>,
        right: Box<Self>,
    },
}

impl<T: Ord> BinarySearchTree<T> {
    pub fn new() -> Self {
        Self(BinarySearchTreeInner::Nil)
    }
}

impl<T: Ord> BinarySearchTree<T> {
    pub fn add_all(&mut self, vec: Vec<T>) {
        for val in vec {
            Self::add(self, val);
        }
    }

    pub fn add(&mut self, val: T) {
        // val を配置すべきNilを探索。
        let nil = Self::find_nil_to_add(&mut self.0, &val);

        *nil = BinarySearchTreeInner::Node {
            val,
            left: Box::new(BinarySearchTreeInner::Nil),
            right: Box::new(BinarySearchTreeInner::Nil),
        }
    }

    fn find_nil_to_add<'t, 'v>(
        cur_node: &'t mut BinarySearchTreeInner<T>,
        val: &'v T,
    ) -> &'t mut BinarySearchTreeInner<T> {
        match cur_node {
            BinarySearchTreeInner::Nil => cur_node,
            BinarySearchTreeInner::Node {
                val: cur_v,
                left,
                right,
            } => {
                if val <= cur_v {
                    Self::find_nil_to_add(left, &val)
                } else {
                    Self::find_nil_to_add(right, &val)
                }
            }
        }
    }

    pub fn contains(&self, val: &T) -> bool {
        Self::contains_inner(&self.0, &val)
    }

    fn contains_inner(cur_node: &BinarySearchTreeInner<T>, val: &T) -> bool {
        match cur_node {
            BinarySearchTreeInner::Nil => false,
            BinarySearchTreeInner::Node {
                val: cur_v,
                left,
                right,
            } => {
                if cur_v == val {
                    return true
                } else if cur_v > val {
                    Self::contains_inner(left, val)
                } else {
                    Self::contains_inner(right, val)
                }
            }
        }
    }
}

use std::fmt::*;



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
    bst.add_all(vec);
    let mut end = start.elapsed();
    println!("二分探査木 生成: {}.{:09} ", end.as_secs(),end.subsec_nanos());

    start = Instant::now();
    for i in 0..10000000 {
        bst.contains(&i);
    }
    end = start.elapsed();
    println!("二分探査木 検索: {}.{:09} ", end.as_secs(),end.subsec_nanos());
}
