import Control.Monad.State

type Stack = [Int]
stackMainp :: State Stack Int
stackMainp = do
  push 3 
  a <- pop
  pop

pop :: State Stack Int
pop = state $ \(x:xs) -> (x,xs)

push :: Int -> State Stack ()
push a = state $ \xs -> ((), a:xs)


