/* * FILENAME :        fcfs.js
*
* DESCRIPTION :
*       JS Script to implement the First-Come First-Serve Algorithm
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

function fcfs(jobs) {
  console.log("Starting FCFS Algorithm @ " + (
  new Date()).toString() + "!");

  standardOutput("fcfs", jobs);

  console.log("Ending FCFS Algorithm @ " + (
  new Date()).toString() + "!");
}
