function f_bestFit(partitions, jobs) {
  var outputPage = $("#output"); $('<div style="width: 100%; text-align: centered;"><h4>Best Fit Scheme</h4></div><br />').appendTo(outputPage);
  var allPartitions = [], busy = [];
  var tempFragmentation = 0, fragmentation = 0, freePosition = 0;
  var matched = false;
  for(var i = 0; i < partitions.length; i++) allPartitions[i] = partitions[i];

  for(i = 0; i < jobs.length; i ++) {
    var memoryAddress = 0;
    $('<p>Job ' + i + ' loads.</p><br />').appendTo(outputPage);
    var table = $('<table class="table"><thead><tr><th scope="col">Partition Size</th><th scope="col">Memory Address</th><th scope="col">Access</th><th scope="col">Partition Status</th></tr></thead><tbody>');

    for(var j = 0; j < partitions.length; j++) {
      if(partitions[j] >= jobs[i]) {
        if (!matched) {
          console.log("no match");
          freePosition = j;
          matched = true
        } else if (partitions[freePosition] > partitions[j]) {
          freePosition = j;
          matched = true;
        } else if (tempFragmentation >= (partitions[j] - jobs[i])) {
          freePosition = j;
          matched = true;
        }
      }
    }
    if(matched) {
      fragmentation = fragmentation + (partitions[freePosition] - jobs[i]);
      busy.push(partitions[freePosition], jobs[i]);
      partitions[freePosition] = 0;
    }
    matched = false;

    var columns = 4; var rows = allPartitions.length;
    for (var r = 0; r < partitions.length; r++) {
      memoryAddress += allPartitions[r];
      var tr = $('<tr>');
      if (partitions[r] == 0) {
        $('<td>' + allPartitions[r] + '</td>').appendTo(tr);
        $('<td>' + memoryAddress + '</td>').appendTo(tr);
        $('<td>Job ' + r + '</td>').appendTo(tr);
        $('<td>Busy</td>').appendTo(tr);
      } else {
        $('<td>' + partitions[r] + '</td>').appendTo(tr);
        $('<td>' + memoryAddress + '</td>').appendTo(tr);
        $('<td></td>').appendTo(tr);
        $('<td>Free</td>').appendTo(tr);
      }
      tr.appendTo(table);
    }
    table.appendTo(outputPage);
    $('<br /> <p>Total Fragmentation: ' + fragmentation + '</p><br />').appendTo(outputPage);
  }
  return;
}

function f_firstFit(partitions, jobs) {
    var outputPage = $("#output"); $('<div style="width: 100%; text-align: centered;"><h4>Best Fit Scheme</h4></div><br />').appendTo(outputPage);
		var allPartitions = [], busy = [];
    var fragmentation = 0;

		for (var i = 0; i < partitions.length; i++) allPartitions[i] = partitions[i];

		for (var i = 0; i < jobs.length; i ++) {
			for (var j = 0; j < partitions.length; j++) {
				if (partitions[j] >= jobs[i]) {
          $('<p>Job ' + i + ' loads.</p><br />').appendTo(outputPage);
          var table = $('<table class="table"><thead><tr><th scope="col">Partition Size</th><th scope="col">Memory Address</th><th scope="col">Access</th><th scope="col">Partition Status</th></tr></thead><tbody>');

					fragmentation += (partitions[j] - jobs[i]);
					busy.push(partitions[j], i);
					partitions[j] = 0, memoryAddress = 0;
					for (var k = 0; k < partitions.length; k++) {
            var tr = $('<tr>');
						memoryAddress += allPartitions[k];
						if (partitions[k] == 0) {
              if (busy.length <= 2) {
                $('<td>' + allPartitions[k] + '</td>').appendTo(tr);
                $('<td>' + memoryAddress + '</td>').appendTo(tr);
                $('<td>Job ' + i + '</td>').appendTo(tr);
                $('<td>Busy</td>').appendTo(tr);
              } else {
                for (var l = 0; l < busy.length; l+=2) {
                  if (allPartitions[k] == busy[l]) {
                    $('<td>' + allPartitions[k] + '</td>').appendTo(tr);
                    $('<td>' + memoryAddress + '</td>').appendTo(tr);
                    $('<td>Job ' + busy[(l+1)] + '</td>').appendTo(tr);
                    $('<td>Busy</td>').appendTo(tr);
                  }
                }
              }
            } else {
              $('<td>' + partitions[k] + '</td>').appendTo(tr);
              $('<td>' + memoryAddress + '</td>').appendTo(tr);
              $('<td></td>').appendTo(tr);
              $('<td>Free</td>').appendTo(tr);
            }
            tr.appendTo(table);
					}
					break;
				}
			}
      table.appendTo(outputPage);
      $('<br /> <p>Total Fragmentation: ' + fragmentation + '</p><br />').appendTo(outputPage);
		}
    return;
}
