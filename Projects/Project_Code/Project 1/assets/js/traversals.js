/*
* FILENAME :        traversals.js
*
* DESCRIPTION :
*       Script to traverse through a tree mode with the parseTree.js and tree.js file
*
* NOTES :
*       
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251
*/
var tempPre = [], tempIn = [], tempPost = [];

// pre-order traversal function
function preOrderTraversal(tree) {
  // Required if/else to ensure we push operands (which are not integers) to the array since they are different values in the tree structure
  if (tree.operand) tempPre.push(tree.operand); // Push the operand to the temporary array if that is the node present
  else tempPre.push(tree.value); // Push the value of the node to the temporary array otherwise

  if (tree.left) this.preOrderTraversal(tree.left); // If there is a  node to the left, recursively run through the left nodes until there are none left
  if (tree.right) this.preOrderTraversal(tree.right); // If there is a node to the right, recursively run through the right nodes until there are none left

  return tempPre; // After all nodes are pushed, return the array
}

// in-order traversal function
function inOrderTraversal(tree) {
  if (tree.left) this.inOrderTraversal(tree.left); // If there is a  node to the left, recursively run through the left nodes until there are none left

  // Required if/else to ensure we push operands (which are not integers) to the array since they are different values in the tree structure
  if (tree.operand) tempIn.push(tree.operand); // Push the operand to the temporary array if that is the node present
  else tempIn.push(tree.value); // Push the value of the node to the temporary array otherwise

  if (tree.right) this.inOrderTraversal(tree.right); // If there is a node to the right, recursively run through the right nodes until there are none left

  return tempIn; // After all nodes are pushed, return the array
}

// post-order traversal function
function postOrderTraversal(tree) {
  if (tree.left) this.postOrderTraversal(tree.left); // If there is a  node to the left, recursively run through the left nodes until there are none left
  if (tree.right) this.postOrderTraversal(tree.right); // If there is a node to the right, recursively run through the right nodes until there are none left

  // Required if/else to ensure we push operands (which are not integers) to the array since they are different values in the tree structure
  if (tree.operand) tempPost.push(tree.operand); // Push the operand to the temporary array if that is the node present
  else tempPost.push(tree.value); // Push the value of the node to the temporary array otherwise

  return tempPost; // After all nodes are pushed, return the array
}
