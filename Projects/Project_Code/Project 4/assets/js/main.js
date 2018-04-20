/* * FILENAME :        main.js
*
* DESCRIPTION :
*       Main JS functions to make the site work
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #4 - CSIS4251 */

function processTextArea(textarea) {
  var values = $(textarea).val().split(","); // Split the value at our delimiter (a comma)
  for (var i = 0; i < values.length; i++) { // Loop through all values entered
    if ((values[i] === "") || (values[i] === " ")) {
      console.log(values[i] + " is an unallowed value; removing it."); // Log the incident
      values.splice(i, 1); // Remove the value IF it is an empty value (,) or it was whitespace
      i--; // Move our counter back so we start at the current position
    }
    // If statement to catch the case where the first value is a whitespace
    if (!(i < 0)) {
      values[i] = values[i].replace(/\s/g, "");
    } // Remove any trailing whitespace

  }
  $(textarea).val(values.join(",")); // Re-add the comma delimiters for easy parsing later on
}

function parseTextArea(textarea) {
  var ta = textarea.val().split(",");
  // If the text area doesnt parse as an array, or is empty return an error
  if (!Array.isArray(ta) || (ta[0] === "")) {
    $("<div>ERROR! Please input data to the processes textarea.</div>").appendTo($(".errors"));
    return;
  }

  // Parse both arrays string values into int's or strings
  var temp = [];
  for (i = 0; i < ta.length; i++) {
    // This reads: Parse the value as an int, and if returned as a NaN (aka not a number),
    //  then push the default value - otherwise push the integer to the array
    if (Number.isNaN(parseInt(ta[i]))) {
      temp.push(ta[i]);
    } else {
      temp.push(parseInt(ta[i]));
    }
  }
  return temp;
}

function sortTasks(tasklist) {
  var temp = [];
  while (tasklist.length > 0) {
    var lowest = tasklist[0].getCPUCycle,
      index = 0;
    for (var i = 1; i < tasklist.length; i++) {
      if (lowest > tasklist[i].getCPUCycle) {
        lowest = tasklist[i].getCPUCycle;
        index = i;
      }
    }

    temp.push(tasklist[index]);
    tasklist.splice(index, 1);
  }
  return temp;
}

$("#evaluate").on("click", function(e) {
  e.preventDefault(); //Prevent the default "submit" action

  // Clear the output div before placing new data
  $("#output").html("");
  $(".errors").html("");

  // Parse the textarea data into arrays, and save them as variables
  var jobs = parseTextArea($("textarea#jobs")),
    arrival = parseTextArea($("textarea#arrivalTime")),
    cycles = parseTextArea($("textarea#cpuCycle")),
    tasks = [];

  // Initilize all sets of data to their own respective array
  for (var i = 0; i < jobs.length; i++) {
    tasks.push(new CPU_Job(jobs[i], arrival[i], cycles[i], 0, 0, 0));
  }

  // Just calling the actual algorithms
  switch (document.querySelector('input[name="alg_type"]:checked').value) {
    case "alg_fcfs":
      fcfs(tasks);
      break;
    case "alg_srt":
      srt(sortTasks(tasks));
      break;
    case "alg_sjn":
      sjn(sortTasks(tasks));
      break;
    case "alg_rr":
      rr(tasks);
      break;
  }
});

$("#reload").on("click", function(e) {
  // Reload the page on reset
  e.preventDefault();

  location.reload();
});

$(document).ready(function() {
  // Everytime a user types, it will check if the key is a number or a space, otherwise it doesnt allow it (unless specified)
  // If there is a space in the field, it will remove and replace it with a comma

  // Allow Arrival Time to have ONLY numbers
  $("textarea#arrivalTime").keypress(function(e) {
    var a = [],
      k = e.which;

    for (var i = 48; i < 58; i++) {
      a.push(i);
    }

    if (!(a.indexOf(k) >= 0) && !(k === 32) && !(k === 44)) {
      e.preventDefault();
    }

    $("textarea#arrivalTime").val($("textarea#arrivalTime").val().split(" ").join(","));
  });

  // Allow CPU Cycles to have ONLY numbers
  $("textarea#cpuCycle").keypress(function(e) {
    var a = [],
      k = e.which;

    for (var i = 48; i < 58; i++) {
      a.push(i);
    }

    if (!(a.indexOf(k) >= 0) && !(k === 32) && !(k === 44)) {
      e.preventDefault();
    }

    $("textarea#cpuCycle").val($("textarea#cpuCycle").val().split(" ").join(","));
  });

  // Allow Jobs to have numbers and letters
  $("textarea#jobs").keypress(function(e) {
    var a = [],
      k = e.which;

    for (var i = 48; i < 58; i++) {
      a.push(i);
    }
    for (var i = 97; i < 123; i++) {
      a.push(i);
    }

    if (!(a.indexOf(k) >= 0) && !(k === 32) && !(k === 44)) {
      e.preventDefault();
    }

    $("textarea#jobs").val($("textarea#jobs").val().split(" ").join(","));
  });
});
