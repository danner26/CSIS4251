/*
* FILENAME :        lru.js
*
* DESCRIPTION :
*       Script for the Least Recently Used policy
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #3 - CSIS4251
*/
function LRU(frames, processes) {
	if (processes[0] === "") { return; }
	var job, hm = "";
	var hit = 0, miss = 0;
	var lr = [];

	outputPage = $("#outputLeft"); $("<div style='width: 100%; text-align: centered;'><h4><u>Least Recently Used</u></h4></div><br />").appendTo(outputPage);

	while (!Array.isArray(processes) || !(processes.length === 0)) {
		job = processes[0];
		if (!(lr.includes(job)) && lr.length === frames) {
			miss++;
			hm = "Miss";
			lr.splice(lr.indexOf(job), 1);
			lr.unshift(job);
		} else if (!lr.includes(job)) {
			miss++;
			hm = "Miss";
			lr.unshift(job);
		} else if (lr.includes(job)) {
			hit++;
			hm = "Hit";
			lr.splice(lr.indexOf(job), 1);
			lr.unshift(job);
		} else {
			hit++;
			hm = "Hit";
		}
		$("<p>Page Requests: " + job + "</p><br />").appendTo(outputPage);
		var table = $("<table class='table'><thead><tr><th scope='col'>Page Number</th> \
      <th scope='col'>Job</th></tr></thead><tbody>");
		var j = 0;
		for (var i = (lr.length - 1); i >= 0; i=i-1) {
			var tr = $("<tr>");
			$("<td>Page " + j + "</td>").appendTo(tr);
			$("<td>Job " + lr[i] + "</td>").appendTo(tr);
			tr.appendTo(table);
			j++;
		}
		j = 0;

		table.appendTo(outputPage);
		$("<div style='width: 100%; font-weight: bold;'>Status: " + hm + "</div><br />").appendTo(outputPage);
		processes.shift();
	}

	$("<hr />").appendTo(outputPage);
	$("<p><h3>Currently in cache?</h3></p><br />").appendTo(outputPage);
	var table = $("<table class='table'><thead><tr><th scope='col'>Items in Cache</th> \
		<th scope='col'>Items</th></tr></thead><tbody>");
	var tr = $("<tr>");
	$("<td>" + lr.length + "</td>").appendTo(tr);
	$("<td>" + lr.join(", ") + "</td>").appendTo(tr);
	tr.appendTo(table);
	table.appendTo(outputPage);

	var total = hit + miss;
	hitPercent = (parseFloat((hit / total) * 100).toFixed(2));
	missPercent = (parseFloat((miss / total) * 100).toFixed(2));

	$("<div class='hitOrmiss'><div class='hits'>Hits: " + hit + "  -  <b>" + hitPercent + "%</b></div><div class='hits'>Misses: " + miss + "  -  <b>" +	missPercent + "%</b></div></div>").appendTo(outputPage);
}
