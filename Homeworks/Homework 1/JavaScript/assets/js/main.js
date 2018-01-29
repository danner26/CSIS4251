var tree = parsePreOrder("3*5/4-3+7^2*6"); //to test operator precedence

console.log(tree.toString());
console.log(JSON.stringify(tree, null, 2));
