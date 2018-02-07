function onStartClick() {
  stringToParse = document.getElementById('string').value.replace(/ /g, '');
  var tree = parseTree(stringToParse);

  var nodes = document.getElementById('errors')
  while (nodes.firstChild) {
    nodes.removeChild(nodes.firstChild);
  }

  var preOrder = preOrderTraversal(tree), inOrder = inOrderTraversal(tree), postOrder = postOrderTraversal(tree);

  console.log(preOrder);
  console.log(inOrder);
  console.log(postOrder);
  console.log(JSON.stringify(tree, null, 2));

  document.getElementById('preorder').innerHTML = '<b>Pre-Order: </b> ' + preOrder.toString().replace(/,/g, ' ');
  document.getElementById('inorder').innerHTML = '<b>In-Order: </b> ' + inOrder.toString().replace(/,/g, ' ');
  document.getElementById('postorder').innerHTML = '<b>Post-Order: </b> ' + postOrder.toString().replace(/,/g, ' ');

  createTreeOnPage(tree);

  // Cleanup
  preOrder.length = 0;
  inOrder.length = 0;
  postOrder.length = 0;
  tree = parseTree(" ")
}
