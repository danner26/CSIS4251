/*
* FILENAME :        main.js
*
* DESCRIPTION :
*       Main part of the script dedicated to running all of the combined scripts after a user clicks the Convert! button
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251
*/
function createCanvas() {
  var canvas = document.createElement("canvas"); // create an "invisible" (empty) element
  canvas.innerHTML = "The browser doesn't support canvas. Try another browser.";
  canvas.setAttribute("id", "expressionCanvas");
  canvas.setAttribute("width", document.getElementById("treeVisualization").offsetWidth);
  canvas.setAttribute("height", document.getElementById("treeVisualization").offsetHeight);
  canvas.setAttribute("style", "width: 100%; height: 100%; text-align: center;");
  document.getElementById("treeVisualization").appendChild(canvas);

  etree = new ETree();
}
function onStartClick() {
  try { // try to clear the canvas before making a new one to clear past results
    var canvas = document.getElementById("treeVisualization"); // Get the div element that the node is contained in and save it to a variable
    while (canvas.firstChild) { canvas.removeChild(canvas.firstChild); } // Check if there are any elements under the errors div, if so remove all of them until none are left
    createCanvas(); // create a new canvas
  } catch (e) { // catch the error
    console.log("no canvas to clear"); // log to the console that there is no canvas
    createCanvas(); // create a new canvas
  }

  // Start by parsing the input
  stringToParse = document.getElementById("string").value.replace(/ /g, ""); // Remove ALL whitespace from the input string
  var tree = parseTree(stringToParse); // Parse the tree and save its structured return in a variable for later use

  // If there were any errors, we need to remove them before displaying the strings proper content
  var errorElement = document.getElementById("errors"); // Get the div element that the node is contained in and save it to a variable
  while (errorElement.firstChild) { errorElement.removeChild(errorElement.firstChild); } // Check if there are any elements under the errors div, if so remove all of them until none are left

  var preOrder = preOrderTraversal(tree), inOrder = inOrderTraversal(tree), postOrder = postOrderTraversal(tree); // Process the expression in all traversals and save their returns as a variable

  //console.log(preOrder); // Log the pre-order traversal to the console
  //console.log(inOrder); // Log the in-order traversal to the console
  //console.log(postOrder); // Log the post-order traversal to the console
  //console.log(JSON.stringify(tree, null, 2)); // Log the tree to the console

  // Put the traversal into the webpage for the user to see
  document.getElementById("preorder").innerHTML = "<b>Pre-Order: </b> " + preOrder.toString().replace(/,/g, " ");
  document.getElementById("inorder").innerHTML = "<b>In-Order: </b> " + inOrder.toString().replace(/,/g, " ");
  document.getElementById("postorder").innerHTML = "<b>Post-Order: </b> " + postOrder.toString().replace(/,/g, " ");

  // Cleanup - clear all arrays and change the value of tree to nothing as well as set the btree root to null
  preOrder.length = 0;
  inOrder.length = 0;
  postOrder.length = 0;
  tree = parseTree(" ");
  etree.root = null;
}
