

function dynamicBestFit(parts, jobs) {
  var tempFragmentation = 0, position = 0, fragmentation = 0;
  var matches = false;
  var partitions = [], busyArray = [];
  var output = "";
  for (i = 0; i < parts.length; i++) partitions.push(parts[i]);

  for (i = 0; i < jobs.length; i++) {
    var table = $('<table><thead><tr><th>Partition Size</th><th>Memory Address</th><th>Access</th><th>Partition Status</th></tr></thead><tbody>');
    for (j = 0; j < parts.length; j++) {
      if (parts[j] >= jobs[i]) {
        if (tempFragmentation >= (parts[j] - jobs[i])) {
          position = j; matches = true;
        }
      }
      if (matches) {
        fragmentation += (parts[position] - jobs[i]);
        busyArray.push(parts[position], jobs[i]);
        output += "<br /> Job " + i + " arrives.<br />";
        parts[position] = 0;
      }
      matches = false;
      //output += "<br /> Partition Size <pre>&#9;</pre> Memory Address <pre>&#9;</pre> Access <pre>&#9;</pre> Partition Status";
      //output += "<br /> --------------------------------------------------------------------------------------------------------";
      columns = 4, rows = partitions.length;


      var memoryAddress = 0;
      for (r = 0; r < parts.length; r++) {
        memoryAddress = memoryAddress + partitions[r];
        var tr = $('<tr>');
        if (parts[r] == 0) {
          $('<td>' + partitions[r] + '</td>').appendTo(tr);
          $('<td>' + memoryAddress + '</td>').appendTo(tr);
          $('<td>' + i + '</td>').appendTo(tr);
          $('<td>Busy</td>').appendTo(tr);
        } else {
          $('<td>' + parts[r] + '</td>').appendTo(tr);
          $('<td>' + memoryAddress + '</td>').appendTo(tr);
          $('<td></td>').appendTo(tr);
          $('<td>Free</td>').appendTo(tr);
        }
        tr.appendTo(table);
      }
    }
    table.appendTo('body');;
  }
  return;
}
