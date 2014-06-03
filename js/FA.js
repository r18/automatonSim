function FA(args) {
  init.call(this,args); 
}

FA.prototype = {
  states:[],
  currentState:"",
  finalState:[],
  transitionTable:{},
  symbols:"",
  log:[],
  eat:function(t){
    return _eat.call(this,t);
  },
  move:function(t){
    return _move.call(this,t);
  }
}
