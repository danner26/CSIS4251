/* * FILENAME :        main.js
*
* DESCRIPTION :
*       Main part of the script dedicated to running all of the combined scripts after a user clicks the Submit button
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #3 - CSIS4251 */
var sliderValue = 3; // Global variable to define the slider's value (AKA number of page frames)
$(document).ready(function() {
  $("#rangeSlider").ionRangeSlider({
      min: 2,
      max: 5,
      from: 3,
      onFinish: function(num) {
        sliderValue = num.from;
      }
  });

  $("textarea#processes").val("1,2,3,1,3,2,1,2,1,2,3,4,4,3,2,1,1,2,1");

  // Everytime a user types, it will check if the key is a number or a space, otherwise it doesnt allow it
  // If there is a space in the field, it will remove and replace it with a comma
  $("textarea").keypress(function(e) {
    var a = [],
      k = e.which;

    for (var i = 48; i < 58; i++) a.push(i);

    if (!(a.indexOf(k) >= 0) && !(k === 32) && !(k === 44)) e.preventDefault();

    $("textarea#processes").val($("textarea#processes").val().split(' ').join(','));
  });
});

$("#evaluate").on("click", function(e) {
  e.preventDefault(); //Prevent the default "submit" action

  $(".errors").html('');

  // Acquire the job sizes and parse them into an array
  processTextArea($("textarea#processes"));

  // Clear the output div before placing new data
  $("#outputLeft").html('');
  $("#outputRight").html('');

  LRU(sliderValue, parseProcesses($("#processes")));
  FIFO(sliderValue, parseProcesses($("#processes")));
});

$("#reload").on("click", function(e) {
  e.preventDefault();

  location.reload();
});

function processTextArea(textarea) {
  var values = $(textarea).val().split(','); // Split the value at our delimiter (a comma)
  for (i = 0; i < values.length; i++) { // Loop through all values entered
    if ((values[i] === "") || (values[i] === " ")) {
      console.log(values[i] + " is an unallowed value; removing it."); // Log the incident
      values.splice(i, 1); // Remove the value IF it is an empty value (,) or it was whitespace
      i--; // Move our counter back so we start at the current position
    }
    // If statement to catch the case where the first value is a whitespace
    if (!(i < 0)) { values[i] = values[i].replace(/\s/g, ''); } // Remove any trailing whitespace

  }
  $(textarea).val(values.join(',')); // Re-add the comma delimiters for easy parsing later on
}

function parseProcesses(textarea) {
  var processes = textarea.val().split(",");
  if (!Array.isArray(processes) || (processes[0] === "")) {
    $("<div>ERROR! Please input data to the processes textarea.</div>").appendTo($(".errors"));
    return;
  }

  // Parse both arrays string values into int's
  var temp = [];
  for (i = 0; i < processes.length; i++) {
    temp.push(parseInt(processes[i]));
  }

  return temp;
}
