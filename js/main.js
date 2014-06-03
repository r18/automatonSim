function main() {
  frame = SVG('mainFrame').size(640,480);
  ctx = {};
  ctx.m = [];
  fa = new DFA([["q1","q2","q3","q4"],"abcd","q1",["q3"]]);
  fa.transitionTable = {
    q1:{a:"q2",b:"q3"},
    q2:{a:"q1",b:"q3",d:"q4"},
    q3:{a:"q3",b:"q3"}
  }
  fa.show();
  fa.showPath();
// fa.sanityCheck();
// fa.move("abab");
}

function drawPath(cs,ns,input) {
  var sx = cs.x+cs.radius/2;
  var sy = cs.y;
  var dx = ns.x+ns.radius/2;
  var dy = ns.y;
  var mx = (sx + dx )/2;
  var my = (sy + dy)/2 - ns.radius; 
  for(i in ctx.m){
    var px = ctx.m[i].x;
    var py = ctx.m[i].y;
    while(Math.abs(py-my) < 50){
      my -= 20;
    }
    while(Math.abs(px-mx) < 50){
      mx -= 20;
    }
  }
  ctx.m.push({x:mx,y:my});
  frame.text(input).move(mx,(my+sy+dy)/3-40);
  var path = frame.path(new SVG.PathArray([
       ['M', sx,sy],
       ['C',sx,sy,mx,my, dx,dy]
     ])).fill({opacity:0.0}).stroke({width:2,color:"#000000"});
  return path;
}
