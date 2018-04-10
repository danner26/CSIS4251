/*
* FILENAME :        createTheTreeOnPage.js
*
* DESCRIPTION :
*       This is the complicated script. It will create yet another tree (as explained before I got lazy and didnt want to go back and rewrite the other tree to instead be this one),
*       then it will add nodes to their proper spot and finally display them on the canvas.
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251
*/
// This is the node of the tree
var Node = function(xCoord, yCoord, radius, theCanvas, value) {
  // Internal values for the node
  this.left = null; // left value
  this.right = null; // right value

  // Internal functions for the node
  this.draw = function() { theCanvas.beginPath(); theCanvas.arc(xCoord, yCoord, radius, 0, 2*Math.PI); theCanvas.stroke(); theCanvas.closePath(); theCanvas.strokeText(value, xCoord, yCoord); };
  this.getValue = function() { return value; }; // Getter: retrieves the nodes value
  this.getXCoord = function() { return xCoord; }; // Getter: retrieves the nodes X Coordinate
  this.getYCoord = function() { return yCoord; }; // Getter: retrieves the nodes Y Coordinate
  this.getRadius = function() { return radius; }; // Getter: retrieves the nodes radius
  this.leftCoord = function() { return {cx: (xCoord - (4*radius)), cy: (yCoord + (4*radius))} }; // Getter: retrieves the nodes left-most (bottom) coordinates in (x,y) form
  this.rightCoord = function() { return {cx: (xCoord + (4*radius)), cy: (yCoord+(4*radius))} }; // Getter: retrieves the nodes right-most (bottom) coordinates in (x,y) form
}

// Draw a line from one node to another
var Line = function() {
  this.draw = function(xCoord, yCoord, tX, tY, radius, theCanvas) {
    var mX = xCoord, mY = yCoord + radius, lX = tX, lY = tY - radius; // create new variables for mX, mY, lX, lY for the moveTo and lineTo functions
    theCanvas.beginPath(); // Start the line drawing
    theCanvas.moveTo(mX, mY); // Start the line to draw
    theCanvas.lineTo(lX, lY); // Draw the line to the end
    theCanvas.stroke(); // Draw the actual line!
  };
};

// The actual Expression Tree
var ETree = function() {
  var canvasElement = document.getElementById("expressionCanvas"); // Get the canvas
  var theCanvas = canvasElement.getContext("2d"); // Put the canvas into a 2D context
  var line = new Line(); // Create a new Line
  this.root = null; // Set the root to null to create a blank ETree (Expression Tree)
  this.getRootNode = function() { return this.root; };
  this.add = function(value) { // Add the node to the tree
    // If the root exists, find the place for the new node (recursively); otherwise add it as the root
    if(this.root) { this.recursiveAddNode(this.root, null, null, value); }
    else { this.root = this.addAndDisplayNode(200, 20, 15, theCanvas, value); }
  };
  this.addAndDisplayNode = function(xCoord, yCoord, radius, theCanvas, value) { // Add the node to the tree and draw it on the campus
    var node = new Node(xCoord, yCoord, radius, theCanvas, value);
    node.draw();
    return node;
  };
  // TODO: FIX THIS
  this.recursiveAddNode = function(node, prevNode, coordinateCallback, value) { // Recursively traverse the tree to find the proper spot
    if(!node) {
      var xy = coordinateCallback(), newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, theCanvas, value);
      line.draw(prevNode.getXCoord(), prevNode.getYCoord(), xy.cx, xy.cy, prevNode.getRadius(), theCanvas); // Draw the new line
      return newNode; // return the node
    }
    else {
      if(value <= node.getValue()) { node.left = this.recursiveAddNode(node.left, node, node.leftCoord, value); }
      else { node.right = this.recursiveAddNode(node.right, node, node.rightCoord, value); }
      return node;
    }
  }
  this.clearCanvas = function() { // Clear the canvas that the tree is on
    var width = document.getElementById("expressionCanvas").width, height = document.getElementById("expressionCanvas").height;
    theCanvas.clearRect(0, 0, width, height);
  }
}

var addToTree = function(value) {
  if(value) { etree.add(value); }
  else { // Honestly, this should never be thrown.. parseTree.js should catch the error EVERY single time.. but for redundancy I added it here too!
    var newError = document.createElement("p"); // create an "invisible" (empty) element
    newError.innerHTML = "ERROR! Please try another input. <b style='weight: bolder;'>" + value + "</b> is not a valid input."; // add the text and error character to the new element
    newError.setAttribute("class", "error"); // add the class "error" to our new element
    document.getElementById("errors").appendChild(newError); // append the element to our div that contains all other errors
    throw new Error("unexpected token '"+ value +"'"); // throw an exception to end the script process and log it to the console
  }
};
