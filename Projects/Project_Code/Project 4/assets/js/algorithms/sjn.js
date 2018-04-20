/* * FILENAME :        sjn.js
*
* DESCRIPTION :
*       JS Script to implement the Shortest Job Next Algorithm
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

function sjn(jobs) {
  console.log("Starting SJN Algorithm @ " + (
  new Date()).toString() + "!");

  standardOutput("sjn", jobs);

  console.log("Ending SJN Algorithm @ " + (
  new Date()).toString() + "!");
}
