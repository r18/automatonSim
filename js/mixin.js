function init(args) {
  this.states = args[0];
  this.symbols = args[1];
  this.currentState = args[2];
  this.initState= args[2];
  this.finalState = args[3];
}

function _move(str){
  for(var i =0;i<str.length;i++){
    var t = str[i];
    var res = this.eat(t);
    if(!res){
      console.log("Break!");
      break;
    }
    this.currentState = res;
  }
  console.log("Finish, currentState:" , this.currentState);
}

function _eat(t){
 console.log("Eat "+t+"  current state: ",this.currentState);
  if(this.transitionTable.hasOwnProperty(this.currentState)){
    if(this.transitionTable[this.currentState].hasOwnProperty(t)){
      console.log("nextState : ",this.transitionTable[this.currentState][t]);
      return this.transitionTable[this.currentState][t];
    }
    console.log("No next state. currentState: ",this.currentState," , Input Symbol : ",t);
    return false;
  }
  console.log("Dead State : ",this.currentState);
  return false;
}
