import Data.Maybe
import Control.Applicative
import Control.Monad.State
import Debug.Trace

type Rule = (Char, [Char], Char)
type FA = ([Rule],Char,[Char]) 

m1 = ([('A',"a",'B'),('A',"bwad",'A'),('B',"b",'A')] ,'A', "B")

process :: FA ->[Char] -> Bool
process fa@(rules, currentState, finalStates) input =
  if input == "" then
    trace "input nil "  (isAccept finalStates currentState)
  else
    let 
      nextStates = map (newStateFA fa) $ remove_Nothing $ eat rules currentState input 
      nextInput = tail input
      results = map ((\str -> \fa-> process fa str) nextInput) nextStates
    in
      foldl (||) False results

newStateFA :: FA -> Char -> FA
newStateFA fa st = 
  let 
    (rules,currentState,finalStates) = fa
  in
    (rules,st,finalStates)

remove_Nothing:: [Maybe Char] -> [Char] 
remove_Nothing lst =  
  trace ("MaybeRes : "++show(lst)) ([fromJust x | x <- lst , not ( x == Nothing)])

eat :: [Rule] -> Char -> [Char] -> [Maybe Char]
eat rules currentState target =
  let
    moveRules = (\input -> \rs -> move rs input) $ head target 
    matchRules = [rule|rule@(c,_,_) <- rules,c == currentState] 
  in map moveRules matchRules 

move :: Rule -> Char-> Maybe Char
move (currentState,stateSet,nextState) input = 
  if isAccept stateSet input then
    Just(nextState)
  else 
    Nothing 
  
isAccept :: [Char] -> Char -> Bool
isAccept (x:xs) input = 
  if x == input then True else isAccept xs input
isAccept [] input = False

{-

mainFA ::  State FA ()
mainFA = do
  xs <- get
  put $ trace (show(xs)) xs
  c <- getState
  setState 'D'
  

getState :: State FA Char
getState = do
  (_,current,_) <- get
  return current

setState :: Char -> State FA ()
setState cur = do
  (a,current,finalState) <- get
  put $ trace ("rules: "++show a) (a,cur,finalState)
-}  


