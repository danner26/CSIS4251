function onStartClick() {
  stringToParse = document.getElementById('string').value.replace(/ /g, '');
  var tree = parseTree(stringToParse);



  var preOrder = preOrderTraversal(tree);
  var inOrder = inOrderTraversal(tree);
  var postOrder = postOrderTraversal(tree);

  console.log(preOrder);
  console.log(inOrder);
  console.log(postOrder);
  console.log(JSON.stringify(tree, null, 2));

  document.getElementById('preorder').innerHTML = '<p><b>Pre-Order: </b> ' + preOrder.toString().replace(/,/g, ' ') + '</p>';
  document.getElementById('inorder').innerHTML = '<p><b>In-Order: </b> ' + inOrder.toString().replace(/,/g, ' ') + '</p>';
  document.getElementById('postorder').innerHTML = '<p><b>Post-Order: </b> ' + postOrder.toString().replace(/,/g, ' ') + '</p>';

  createTreeOnPage(tree);

  // Cleanup
  preOrder.length = 0;
  inOrder.length = 0;
  postOrder.length = 0;
  tree = parseTree(" ")
}
