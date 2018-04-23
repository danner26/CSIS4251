/* * FILENAME :        srt.js
*
* DESCRIPTION :
*       JS Script to implement the Shortest Remaining Time Algorithm
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

function srt(jobs) {
  console.log("Starting SRT Algorithm @ " + (
  new Date()).toString() + "!");

  var outputPage = $("#output");
  $("<div style='width: 100%; text-align: centered;'><h4><u>Shortest Remaining Time</u></h4></div><br />").appendTo(outputPage);
  var time = 0,
    allTA = 0,
    allWT = 0;

  var table = $("<table class='table'><thead><tr><th scope='col'>Job</th> \
    <th scope='col'>Arrival</th><th scope='col'>CPU Cycle</th><th scope='col'>Wait Time</th>\
    <th scope='col'>Turn Around</th></tr></thead><tbody>");
  for (var i = 0; i < jobs.length; i++) {
    var tr = $("<tr>");
    var job = jobs[i];
    var ta = job.getCPUCycle - job.getArrival;
    job.setTurnAround(ta);
    allTA += ta;
    time += job.getCPUCycle;
    job.setWaitTime(time);
    allWT += time;

    $("<td>" + job.getJob + "</td>").appendTo(tr);
    $("<td>" + job.getArrival + "</td>").appendTo(tr);
    $("<td>" + job.getCPUCycle + "</td>").appendTo(tr);
    $("<td>" + job.getWaitTime + "</td>").appendTo(tr);
    $("<td>" + job.getTurnAround + "</td>").appendTo(tr);
    tr.appendTo(table);
  }
  table.appendTo(outputPage);

  var avgTA = allTA / jobs.length;
  if (avgTA > 0) {
    $("<div style='display: inline-block;'><h6>Average Turn Around:</h6></div><div style='display: inline-block; padding-left: 5px;'>" + (
    allTA / jobs.length) + " ms</div><br />").appendTo(outputPage);
  } else {
    $("<div style='display: inline-block;'><h6>Average Turn Around:</h6></div><div style='display: inline-block; padding-left: 5px;'>0 ms</div><br />").appendTo(outputPage);
  }
  $("<div style='display: inline-block;'><h6>Average Wait Time:</h6></div><div style='display: inline-block; padding-left: 5px;'>" + (
  allWT / jobs.length) + "</div><br />").appendTo(outputPage);

  console.log("Ending SRT Algorithm @ " + (
  new Date()).toString() + "!");
}
