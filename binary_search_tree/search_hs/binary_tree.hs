-- type Tree = [Integer, (Integer, Integer)]
-- data Tree = Empty | Node Int Tree Tree deriving Show
import System.IO
import Data.List.Split

data Tree a = Empty | Node a (Tree a) (Tree a) deriving Show

-- testData = do
--     content <- readFile "../data_1000000.txt" >>= return . map (read :: String -> Int) . words
--     mapM_ putStrLn $ take n contents

loadLines :: String -> IO [String]
loadLines filename = do
    handle <- openFile filename ReadMode
    contents <- hGetContents handle
    return $ lines contents

main = do
    line <- loadLines "../data_1000000.txt"
    lineInt <- return $ map (\x -> read x :: Int) line
    print $ take 1 lineInt

insert :: Ord k => k -> Tree k -> Tree k
insert x Empty = Node x Empty Empty
insert x (Node k left right)
    | x == k    = Node x left right
    | x < k     = Node k (insert x left) right
    | otherwise = Node k left (insert x right)

fromList :: Ord k => [k] -> Tree k
fromList xs = foldl (\a (v) -> insert v a) Empty xs


-- treeElem :: (Ord a) => a -> Tree a -> Bool
-- treeElem _ Empty = False
-- treeElem x (Node a left right)
--     | x == a    = True
--     | x < a     = treeElem x left
--     | otherwise = treeElem x right


-- div2 :: Int->Int
-- div2 n = truncate ((fromIntegral n :: Float) / 2.0)

-- -- | [a]を前半と真ん中と後半の３つの部分に分ける
-- divArrayIn3 :: [a] -> ([a],a,[a])
-- divArrayIn3 [] = error "error"
-- divArrayIn3 [x] = ([],x,[])
-- divArrayIn3 xs = (first,middle,second)
--     where
--         halfLength = div2 $ length xs
--         first = take halfLength xs
--         middle:second = drop halfLength xs

-- createMinumulBST :: [a] -> Tree a
-- createMinumulBST [] = Empty
-- createMinumulBST xs = Node middle left right
--     where
--         (first,middle,second) = divArrayIn3 xs
--         left = createMinumulBST $ first
--         right = createMinumulBST $ second
