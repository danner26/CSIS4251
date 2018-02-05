function createTreeOnPage(inOrderArray) {
  var i, j;
  var content = "";
  var array_size = ((inOrderArray.length / 2) + 1) * 2;
  i = 1;

  do {
    i = i * 2
  } while (i < array_size)
  array_size = i
  for (i = 1; i <= array_size; i++) {
    if (!inOrderArray[i]) {
      inOrderArray[i] = "null"
    }
  }
  content += "<div align='center'><table border>"
  i = 2
  while (i <= array_size) {
    content += "<tr>"
    for (var j = i - i / 2; j < i; j++) {
      content += "<td colspan='" + array_size / i + "'>" + inOrderArray[j - 1] + "</td>"
    }
    i = i * 2
    content += "</tr>"
  }
  content += "</table></div>"
  var div = document.getElementById('newTable');
  div.innerHTML = content;
}
