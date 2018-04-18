var Solver = class {
  constructor(job, arrival, cycle, waitTime, turnAround, completionTime) {
    this.job = job;
    this.arrival = arrival;
    this.cpuCycle = cycle;
    this.waitTime = waitTime;
    this.turnAround = turnAround;
    this.completionTime = completionTime;
  }

  get getJob() {
    return this.job;
  }
  setJob(job) {
    this.job = job;
  }
  get getArrival() {
    return this.arrival;
  }
  setArrival(arrival) {
    this.arrival = arrival;
  }
  get getCPUCycle() {
    return this.cpuCycle;
  }
  setCPUCycle(cycle) {
    this.cpuCycle = cycle;
  }
  get getWaitTime() {
    return this.waitTime;
  }
  setWaitTime(time) {
    this.waitTime = time;
  }
  get getTurnAround() {
    return this.turnAround;
  }
  setTurnAround(ta) {
    this.turnAround = ta;
  }
  get getCompletionTime() {
    return this.completionTime;
  }
  setCompletionTime(time) {
    this.completionTime = time;
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
