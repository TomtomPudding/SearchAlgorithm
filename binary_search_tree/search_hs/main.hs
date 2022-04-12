import Data.Bool

showAge :: (Integer, Bool) -> String
showAge (age, isShow) | isShow = show age | otherwise = "secret"

sum3N :: Integer -> Integer
-- sum3N n = sum $ filter((== 0) . (`mod` 3)) [0 .. 3 * n]
sum3N n = sum $ map (* 3) [0 .. n]
sum3N5 n = sum . map (* 3) $ filter ((/= 0) . (`mod` 5)) [0 .. n]

productOdd3 n = product . map (* 3) $ filter (odd) [0 .. n]

factor n
    | n < 2 = 1
    | otherwise = head $ filter ((== 0) . (n `mod`)) [2 ..]

cube = map(^ 3) [0 ..]
