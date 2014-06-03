function FA(args) {
  init.call(this,args); 
}

FA.prototype = {
  states:[],
  currentState:"",
  initState:"",
  finalState:[],
  transitionTable:{},
  symbols:"",
  log:[],
  elems:[],
  eat:function(t){
    return _eat.call(this,t);
  },
  move:function(t){
    return _move.call(this,t);
  },
  show:function(){
    for(i in this.states){
      var stateElem = new DrawableState(this.states[i],i*150,200+i*30);
      stateElem.draw();
      this.elems.push(stateElem);
    }
  },
  showPath:function(){ 
    for(cs in this.transitionTable){
      var csElem = this.getElemByStateName(cs);
//      console.log(csElem.stateName,csElem.x,csElem.y);
      for(j in this.transitionTable[cs]){   
        var ns = this.transitionTable[cs][j];
        if(cs == ns)break;
        var nsElem = this.getElemByStateName(ns);
        drawPath(csElem,nsElem,j);
      }
    }

   },
  getElemByStateName:function(name){
    for (i in this.elems){
      if(this.elems[i].stateName == name)return this.elems[i];
    }
    return false;
  },
}

function DrawableState(name,x,y){
  this.stateName = name;
  this.x = x;
  this.y = y ;
}
DrawableState.prototype  = {
  stateName:"",
  x:0,
  y:0,
  radius:100,
  isFinal:false,
  isStart:false,
  elem:"",
  draw:function(){
   this.elem = frame.circle(this.radius)
    .fill({opacity:0.2})
    .stroke({color:"#00ff00"})
    .move(this.x,this.y); 
   this.text = frame.text(this.stateName).move(this.x+this.radius/2,this.y+this.radius/2);
  }
};
