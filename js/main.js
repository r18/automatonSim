function main() {
  frame = SVG('mainFrame').size(640,480);
  var rect = frame.rect(200,200).attr({fill:"#f05"});
  c = frame.circle(100);
  fa = new DFA([["q1","q2","q3","q4"],"abc","q1",["q3"]]);
  fa.transitionTable = {
    q1:{a:"q2",b:"q3"},
    q2:{a:"q1",b:"q3"},
    q3:{a:"q3",b:"q3"}
  }
  fa.sanityCheck();
  fa.move("abab");
}
