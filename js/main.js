function main() {
  frame = SVG('mainFrame').size(640,480);
  fa = new DFA([["q1","q2","q3","q4"],"abcd","q1",["q3"]]);
  fa.transitionTable = {
    q1:{a:"q2",b:"q3"},
    q2:{a:"q1",b:"q3",d:"q4"},
    q3:{a:"q3",b:"q3"}
  }
  fa.show();
  fa.showPath();
//  fa.sanityCheck();
// fa.move("abab");
}

function drawPath(cs,ns) {
  var sx = cs.x+cs.radius/2;
  var sy = cs.y;
  var dx = ns.x+ns.radius/2;
  var dy = ns.y;
  var mx = (sx + dx )/2;
  var my = (sy + dy)/2 - ns.radius; 
  var path = frame.path(new SVG.PathArray([
       ['M', sx,sy],
       ['C',sx,sy,mx,my, dx,dy]
     ])).fill({opacity:0.0}).stroke({width:2,color:"#000000"});
  return path;
}
