import Data.Maybe
import Control.Applicative
import Debug.Trace

type Rule = (Char, [Char], Char)

process :: [Rule] -> Char -> [Char] ->[Char] -> Bool
process rules currentState finalStates input =
  if input == "" then
    isAccept finalStates currentState  
  else
    let 
      maybeRes = eat rules currentState input 
      res = [fromJust (x) | x <- maybeRes, not $ x == Nothing] 
      eat' = (\r -> \t -> \c -> eat r c t)  rules (tail input)
    in 
      if length res> 1 then
        let 
          ret = (map  eat' res) 
        in
          False

      else if length res == 0 then
        False
      else
        True

          
      
      


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
