var myArray = [];
const testingDependency = (tsk, dep) => {
  var Task = tsk;
  var dependency = dep;
  myArray = [];
  var set = new Set();
  for (var i = 0; i < Task.length; i++) {
    set.add(Task[i]);
  }
  let adj = new Map();
  if (dependency.length == 0 && Task.length == 0) {
    //if there is no node and there is no dependency then simply return empty hashmap
    return (myArray = []);
  } else if (dependency.length == 0) {
    // if there is node but no dependenc then add them in order of node or any order doesn't matter
    for (var i = 0; i < Task.length; i++) {
      adj.set(Task[i], new Set());
    }
  } else {
    for (var i = 0; i < dependency.length; i++) {
      var arr = dependency[i].split("=>");
      if (adj.has(arr[1])) {
        var temp = adj.get(arr[1]).add(arr[0]);
      } else {
        adj.set(arr[1], new Set());
        adj.get(arr[1]).add(arr[0]);
      }
    }
  }

  PrintExecutionOrder(adj);

  function PrintExecutionOrder(adj) {
    var set = new Set();
    while (adj.size > 0) {
      for (let [key, value] of adj) {
        for (var i = 0; i < value.size; i++) {
          set.add(value.values().next().value); //creating a set to find the dependency between nodes
        }
      }
      var root = GetRoot(adj, set); //finding the root node which has no dependency from adjecency list

      if (root != "Loop Found") {
        //if there is no loop remove independent node and process for other nodes recussivly
        // console.log(root, "root");
        myArray.push(root);
        var next = adj.get(root);
        adj.delete(root); // removing the independent node that has no dependency on other nodes
        set = new Set();
        for (let [key, value] of adj) {
          for (var i = 0; i < value.size; i++) {
            set.add(value.values().next().value); // creating a set to find dependency after removal of the independent node
          }
        }

        for (let item of next) {
          // if after removal of independent node a node is leaf node then print it.
          var leafNode = item;
          if (!adj.has(leafNode) && !set.has(leafNode)) {
            // console.log(leafNode + ",", "leafNode");
            myArray.push(leafNode);
          }
        }
        //recussivly call the same method untill the hashMap size becomes zero. i.e. there is no dependncy and all the nodes are visited
        PrintExecutionOrder(adj);
      } else {
        return myArray.push("Error - this is a cyclic dependency");
      }
    }
  }

  function GetRoot(adj, s) {
    for (let key of adj.keys()) {
      if (!s.has(key)) {
        return key;
      }
    }
    return "Loop Found";
  }
  return myArray;
};
module.exports = {
  testingDependency
};
