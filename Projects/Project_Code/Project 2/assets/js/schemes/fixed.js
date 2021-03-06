/*
* FILENAME :        fixed.js
*
* DESCRIPTION :
*       Script for the fixed partition memory type - implements BestFit, FirstFit, NextFit, and WorstFit
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #2 - CSIS4251
*/
function fBestFit(partitions, jobs) {
  var outputPage = $("#output"); $("<div style='width: 100%; text-align: centered;'><h4>Best Fit Scheme</h4></div><br />").appendTo(outputPage);
  var allPartitions = [], busy = [];
  var tempFragmentation = 0, fragmentation = 0, freePos = 0;
  var matched = false;
  for (i = 0; i < partitions.length; i++) { allPartitions[i] = partitions[i]; }

  for (i = 0; i < jobs.length; i++) {
    var memoryAddress = 0;
    $("<p>Job " + i + " loads.</p><br />").appendTo(outputPage);
    var table = $("<table class='table'><thead><tr><th scope='col'>Partition Size</th> \
      <th scope='col'>Memory Address</th><th scope='col'>Access</th><th scope='col'>Partition Status</th></tr></thead><tbody>");

    for (j = 0; j < partitions.length; j++) {
      if (partitions[j] >= jobs[i]) {
        if (!matched) { freePos = j; matched = true; }
        else if (partitions[freePos] > partitions[j]) { freePos = j; matched = true; }
        else if (tempFragmentation >= (partitions[j] - jobs[i])) { freePos = j; matched = true; }
      }
    }
    if (matched) {
      fragmentation += (partitions[freePos] - jobs[i]);
      busy.push(partitions[freePos], i);
      partitions[freePos] = 0;
    }
    matched = false;

    var columns = 4, rows = allPartitions.length;
    for (r = 0; r < partitions.length; r++) {
      memoryAddress += allPartitions[r];
      var tr = $("<tr>");
      if (partitions[r] === 0) {
        if (busy.length !== 2) {
          for (l = 0; l < busy.length; l += 2) {
            if (allPartitions[r] === busy[l]) {
              $("<td>" + allPartitions[r] + "</td>").appendTo(tr);
              $("<td>" + memoryAddress + "</td>").appendTo(tr);
              $("<td>Job " + busy[(l + 1)] + "</td>").appendTo(tr);
              $("<td>Busy</td>").appendTo(tr);
            }
          }
        } else {
          $("<td>" + allPartitions[r] + "</td>").appendTo(tr);
          $("<td>" + memoryAddress + "</td>").appendTo(tr);
          $("<td>Job " + i + "</td>").appendTo(tr);
          $("<td>Busy</td>").appendTo(tr);
        }
      } else {
        $("<td>" + partitions[r] + "</td>").appendTo(tr);
        $("<td>" + memoryAddress + "</td>").appendTo(tr);
        $("<td></td>").appendTo(tr);
        $("<td>Free</td>").appendTo(tr);
      }
      tr.appendTo(table);
    }
    table.appendTo(outputPage); $("<br /> <p>Total Fragmentation: " + fragmentation + "</p><br />").appendTo(outputPage);
    $("<hr><br />").appendTo(outputPage);
  }
}

function fFirstFit(partitions, jobs) {
  var outputPage = $("#output"); $("<div style='width: 100%; text-align: centered;'><h4>First Fit Scheme</h4></div><br />").appendTo(outputPage);
  var allPartitions = [], busy = [];
  var fragmentation = 0;
  for (i = 0; i < partitions.length; i++) { allPartitions[i] = partitions[i]; }

  for (i = 0; i < jobs.length; i++) {
    for (j = 0; j < partitions.length; j++) {
      if (partitions[j] >= jobs[i]) {
        $("<p>Job " + i + " loads.</p><br />").appendTo(outputPage);
        var table = $("<table class='table'><thead><tr><th scope='col'>Partition Size</th> \
        <th scope='col'>Memory Address</th><th scope='col'>Access</th><th scope='col'>Partition Status</th></tr></thead><tbody>");

        fragmentation += (partitions[j] - jobs[i]);
        busy.push(partitions[j], i);
        partitions[j] = 0, memoryAddress = 0;
        for (k = 0; k < partitions.length; k++) {
          var tr = $("<tr>");
          memoryAddress += allPartitions[k];
          if (partitions[k] === 0) {
            if (busy.length !== 2) {
              for (l = 0; l < busy.length; l += 2) {
                if (allPartitions[k] === busy[l]) {
                  $("<td>" + allPartitions[k] + "</td>").appendTo(tr);
                  $("<td>" + memoryAddress + "</td>").appendTo(tr);
                  $("<td>Job " + busy[(l + 1)] + "</td>").appendTo(tr);
                  $("<td>Busy</td>").appendTo(tr);
                }
              }
            } else {
              $("<td>" + allPartitions[k] + "</td>").appendTo(tr);
              $("<td>" + memoryAddress + "</td>").appendTo(tr);
              $("<td>Job " + i + "</td>").appendTo(tr);
              $("<td>Busy</td>").appendTo(tr);
            }
          } else {
            $("<td>" + partitions[k] + "</td>").appendTo(tr);
            $("<td>" + memoryAddress + "</td>").appendTo(tr);
            $("<td></td>").appendTo(tr);
            $("<td>Free</td>").appendTo(tr);
          }
          tr.appendTo(table);
        }
        break;
      }
    }
    table.appendTo(outputPage);
    $("<br /> <p>Total Fragmentation: " + fragmentation + "</p><br />").appendTo(outputPage);
    $("<hr><br />").appendTo(outputPage);
  }
}

function fNextFit(partitions, jobs) {
  var outputPage = $("#output"); $("<div style='width: 100%; text-align: centered;'><h4>Next Fit Scheme</h4></div><br />").appendTo(outputPage);
  var table = $("<table class='table'><thead><tr><th scope='col'>Partition Size</th> \
    <th scope='col'>Memory Address</th><th scope='col'>Access</th><th scope='col'>Partition Status</th></tr></thead><tbody>");
  var allPartitions = [], busy = [];
  var fragmentation = 0, position = 0, zPosition = 0;
  for (i = 0; i < partitions.length; i++) { allPartitions[i] = partitions[i]; }

  for (i = 0; i < jobs.length; i++) {
    for (j = position; j < partitions.length; j++) {
      zPosition = j;
      if (partitions[j] >= jobs[i]) {
        fragmentation += (partitions[j] - jobs[i]);
        busy.push(partitions[j], i);
        $("<p>Job " + i + " loads.</p><br />").appendTo(outputPage);
        partitions[j] = 0;
        break;
      }
    }
    if (position === partitions.length) {
      for (k = 0; k < zPosition; k++) {
        fragmentation += (partitions[k] - jobs[i]);
        busy.push(partitions[k], i);
        $("<p>Job " + i + " arrives.</p><br />").appendTo(outputPage);
        partitions[k] = 0;
        break;
      }
    }
  }

  var memoryAddress = 0;
  for (i = 0; i < partitions.length; i++) {
    memoryAddress += allPartitions[i];
    var tr = $("<tr>");
    if (partitions[i] === 0) {
      if (busy.length !== 2) {
        for (l = 0; l < busy.length; l += 2) {
          if (allPartitions[i] === busy[l]) {
            $("<td>" + allPartitions[i] + "</td>").appendTo(tr);
            $("<td>" + memoryAddress + "</td>").appendTo(tr);
            $("<td>Job " + busy[(l + 1)] + "</td>").appendTo(tr);
            $("<td>Busy</td>").appendTo(tr);
          }
        }
      } else {
        $("<td>" + allPartitions[i] + "</td>").appendTo(tr);
        $("<td>" + memoryAddress + "</td>").appendTo(tr);
        $("<td>Job " + i + "</td>").appendTo(tr);
        $("<td>Busy</td>").appendTo(tr);
      }
    } else {
      $("<td>" + partitions[i] + "</td>").appendTo(tr);
      $("<td>" + memoryAddress + "</td>").appendTo(tr);
      $("<td></td>").appendTo(tr);
      $("<td>Free</td>").appendTo(tr);
    }
    tr.appendTo(table);
  }
  table.appendTo(outputPage);
  $("<br /> <p>Total Fragmentation: " + fragmentation + "</p><br />").appendTo(outputPage);
  $("<hr><br />").appendTo(outputPage);
}

function fWorstFit(partitions, jobs) {
  var outputPage = $("#output"); $("<div style='width: 100%; text-align: centered;'><h4>Worst Fit Scheme</h4></div><br />").appendTo(outputPage);
  var table = $("<table class='table'><thead><tr><th scope='col'>Partition Size</th> \
    <th scope='col'>Memory Address</th><th scope='col'>Access</th><th scope='col'>Partition Status</th></tr></thead><tbody>");
		var allPartitions = [], busy = [];
		var tempFrag = 0, fragmentation = 0, freePos = 0;
    var matchFound = false;
		for (i = 0; i < partitions.length; i++) { allPartitions[i] = partitions[i]; }

		for (i = 0; i < jobs.length; i ++) {
			for (z = 0; z < partitions.length; z++) {
				if (partitions[z] >= jobs[i]) {
					if (tempFrag <= (partitions[z] - jobs[i])) {
						freePos = z;
						matchFound = true;
					}
				}
			}
			if (matchFound === true) {
				fragmentation = fragmentation + (partitions[freePos] - jobs[i]);
				busy.push(partitions[freePos], i);
				$("<p>Job " + i + " loads.</p><br />").appendTo(outputPage);
				partitions[freePos] = 0;
			}
			matchFound = false;
		}
		var memoryAddress = 0;
		for (i = 0; i < partitions.length; i++) {
      var tr = $("<tr>");
			memoryAddress = memoryAddress + allPartitions[i];
      if (partitions[i] === 0) {
        if (busy.length !== 2) {
          for (l = 0; l < busy.length; l += 2) {
            if (allPartitions[i] === busy[l]) {
              $("<td>" + allPartitions[i] + "</td>").appendTo(tr);
              $("<td>" + memoryAddress + "</td>").appendTo(tr);
              $("<td>Job " + busy[(l + 1)] + "</td>").appendTo(tr);
              $("<td>Busy</td>").appendTo(tr);
            }
          }
        } else {
          $("<td>" + allPartitions[i] + "</td>").appendTo(tr);
          $("<td>" + memoryAddress + "</td>").appendTo(tr);
          $("<td>Job " + i + "</td>").appendTo(tr);
          $("<td>Busy</td>").appendTo(tr);
        }
      } else {
        $("<td>" + partitions[i] + "</td>").appendTo(tr);
        $("<td>" + memoryAddress + "</td>").appendTo(tr);
        $("<td></td>").appendTo(tr);
        $("<td>Free</td>").appendTo(tr);
      }
      tr.appendTo(table);
		}
    table.appendTo(outputPage);
    $("<br /> <p>Total Fragmentation: " + fragmentation + "</p><br />").appendTo(outputPage);
    $("<hr><br />").appendTo(outputPage);
}
