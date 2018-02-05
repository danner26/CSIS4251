var tempPre = [], tempIn = [], tempPost = [];

function preOrderTraversal(tree) {
  if (tree.operand) tempPre.push(tree.operand); //console.log(tree.operand);
  else tempPre.push(tree.value); //console.log(tree.value);

  if (tree.left) this.preOrderTraversal(tree.left);
  if (tree.right) this.preOrderTraversal(tree.right);

  return tempPre;
}

function inOrderTraversal(tree) {
  if (tree.left) this.inOrderTraversal(tree.left);

  if (tree.operand) {
    tempIn.push(tree.operand); //console.log(tree.operand);
  } else {
    tempIn.push(tree.value); //console.log(tree.value);
  }

  if (tree.right) this.inOrderTraversal(tree.right);

  return tempIn;
}

function postOrderTraversal(tree) {
  if (tree.left) this.postOrderTraversal(tree.left);
  if (tree.right) this.postOrderTraversal(tree.right);

  if (tree.operand) tempPost.push(tree.operand); //console.log(tree.operand);
  else tempPost.push(tree.value); //console.log(tree.value);

  return tempPost;
}
