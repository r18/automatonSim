function DFA(args) {
 init.call(this,args);
}

DFA.prototype = Object.create(FA.prototype);

DFA.prototype.sanityCheck = function(){
  console.log("Checking transition function as DFA ...");
  var err = [];
  for(i in this.states){
     if(!this.transitionTable.hasOwnProperty(this.states[i])){
        err.push("Error : undefine state trainsition function for "+this.states[i]);
     }else {
        var stf = this.transitionTable[this.states[i]];
        for(var j = 0; j< this.symbols.length;j++){
          if(!stf.hasOwnProperty(this.symbols[j]))
           err.push("    Error : undefine state transition function "+this.states[i] +" for input string " + this.symbols[j]);
        }
     }

  }

  console.log(err.length+ " Errors");
  for(i in err){
    console.log(err[i]);
  }
  return err;
}
