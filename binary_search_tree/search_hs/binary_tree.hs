-- type Tree = [Integer, (Integer, Integer)]
-- data Tree = Empty | Node Int Tree Tree deriving Show
import System.IO
import Data.List.Split
import Data.Time
import Test.HUnit
import Control.Monad

data Tree a = Empty | Node a (Tree a) (Tree a) deriving Show

-- testData = do
--     content <- readFile "../data_1000000.txt" >>= return . map (read :: String -> Int) . words
--     mapM_ putStrLn $ take n contents

loadLines :: String -> IO [String]
loadLines filename = do
    handle <- openFile filename ReadMode
    contents <- hGetContents handle
    return $ lines contents

search :: Ord k => k -> Tree k -> Maybe k
search _ Empty = Nothing
search x (Node k left right)
    | x == k    = Just k
    | x < k     = search x left
    | x > k     = search x right
    | otherwise = Nothing

insert :: Ord k => k -> Tree k -> Tree k
insert x Empty = Node x Empty Empty
insert x (Node k left right)
    | x == k    = Node x left right
    | x < k     = Node k (insert x left) right
    | otherwise = Node k left (insert x right)

getAnswer :: Int -> [Int] -> Maybe Int
getAnswer n answers
    | (elem n answers) = Just n
    | otherwise      = Nothing

-- foldl 左結合
-- foldl (⊕) v [x0, x1, ..., xn] = (...((v ⊕ x0) ⊕ x1)...) ⊕ xn
-- a は初期値をEmpty にしループ中は前回ループの結果が利用される
fromList :: Ord k => [k] -> Tree k
fromList xs = foldl (\a (v) -> insert v a) Empty xs

loopTree 0 tree = Nothing
loopTree n tree = do {
    search n tree;
    loopTree (n - 1) tree
}

treeTest :: Tree Int -> [Int] -> Test
treeTest tree answers = test $ map (\x -> (search x tree) ~=? (getAnswer x answers)) [1..100000]

main = do
    line <- loadLines "../data_1000000.txt"
    lineInt <- return $ map (\x -> read x :: Int) line
    start <- getCurrentTime
    resultTree <- return $ fromList lineInt
    print $ (search 6698254 resultTree)
    end <- getCurrentTime
    print $ diffUTCTime end start
    -- _ <- runTestTT (treeTest resultTree lineInt)
    print $ length $ map (\x -> (search x resultTree)) [1..10000000]
    end2 <- getCurrentTime
    print $ diffUTCTime end2 end
