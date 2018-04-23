/* * FILENAME :        rr.js
*
* DESCRIPTION :
*       JS Script to implement the Round-Robin Algorithm
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

function rr(jobs) {
  console.log("Starting RR Algorithm @ " + (
  new Date()).toString() + "!");

  var size = jobs.length,
    placeholder = 0;
  while (size > 0) {
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].getCPUCycle > 0) {
        var value = jobs[i].getCPUCycle - 4;
        if (value <= 0) {
          placeholder = placeholder + jobs[i].getCPUCycle;
          jobs[i].setTurnAround(jobs[i].getCompletionTime);
          jobs[i].setCompletionTime(placeholder - jobs[i].getArrival);
          jobs[i].setCPUCycle(0);
        } else {
          placeholder += 4;
          jobs[i].setCompletionTime(placeholder);
          jobs[i].setCPUCycle(value);
        }
      } else {
        size--;
      }
    }
  }

  for (var i = 0; i < jobs.length; i++) {
    jobs[i].setCPUCycle(jobs[i].getCompletionTime + 1);
  }

  standardOutput("rr", jobs);

  console.log("Ending RR Algorithm @ " + (
  new Date()).toString() + "!");
}
