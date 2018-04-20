/* * FILENAME :        CPU_Job.js
*
* DESCRIPTION :
*       JS Script to initilize a class object, CPU_Job, which allows us the set/get
*        information in an easier form
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

var CPU_Job = class {
  constructor(job, arrival, cycle, waitTime, turnAround, completionTime) {
    this.job = job;
    this.arrival = arrival;
    this.cpuCycle = cycle;
    this.waitTime = waitTime;
    this.turnAround = turnAround;
    this.completionTime = completionTime;
  }

  setJob(job) {
    this.job = job;
  }
  setArrival(arrival) {
    this.arrival = arrival;
  }
  setCPUCycle(cycle) {
    this.cpuCycle = cycle;
  }
  setWaitTime(time) {
    this.waitTime = time;
  }
  setTurnAround(ta) {
    this.turnAround = ta;
  }
  setCompletionTime(time) {
    this.completionTime = time;
  }

  get getJob() {
    return this.job;
  }
  get getArrival() {
    return this.arrival;
  }
  get getCPUCycle() {
    return this.cpuCycle;
  }
  get getWaitTime() {
    return this.waitTime;
  }
  get getTurnAround() {
    return this.turnAround;
  }
  get getCompletionTime() {
    return this.completionTime;
  }

  compareTo(second) {
    if (second == null) {
      console.log("failure");
    } else if (this.cpuCycle < second.cpuCycle) {
      return -1;
    } else if (this.cpuCycle > second.cpuCycle) {
      return 1;
    }
    return 0;
  }
}
