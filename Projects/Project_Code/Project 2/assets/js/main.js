/* * FILENAME :        main.js
*
* DESCRIPTION :
*       Main part of the script dedicated to running all of the combined scripts after a user clicks the Submit button
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #2 - CSIS4251 */
function determinAlgorithm(partitionType, algorithmType, partitions, jobs) {
  // Combine the partition type and the algorithm type and send it to the proper function
  switch (partitionType + "|" + algorithmType) {
    case "dynamic|alg_best":
      dBestFit(partitions, jobs);
      break;
    case "dynamic|alg_first":
      dFirstFit(partitions, jobs);
      break;
    case "dynamic|alg_next":
      dNextFit(partitions, jobs);
      break;
    case "dynamic|alg_worst":
      dWorstFit(partitions, jobs);
      break;
    case "fixed|alg_best":
      fBestFit(partitions, jobs);
      break;
    case "fixed|alg_first":
      fFirstFit(partitions, jobs);
      break;
    case "fixed|alg_next":
      fNextFit(partitions, jobs);
      break;
    case "fixed|alg_worst":
      fWorstFit(partitions, jobs);
      break;
    default:
      alert("Please ensure you select a Type of Memory AND a Type of Scheme");
      break;
  }
}

/* On start these functions are loaded */
document.addEventListener("DOMContentLoaded", function () {
  // Everytime a user types, it will check if the key is a number or a space, otherwise it doesnt allow it
  // If there is a space in the field, it will remove and replace it with a comma
  $("textarea").keypress(function(e) {
    var a = [],
      k = e.which;

    for (var i = 48; i < 58; i++) { a.push(i); }

    if (!(a.indexOf(k) >= 0) && !(k === 32) && !(k === 44)) { e.preventDefault(); }

    $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(" ").join(","));
    $("textarea#jobSizes").val($("textarea#jobSizes").val().split(" ").join(","));
  });
});

$("#evaluate").on("click", function(e) {
  e.preventDefault(); //Prevent the default "submit" action

  // Acquire the job sizes and parse them into an array
  $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(" ").join(""));
  $("textarea#jobSizes").val($("textarea#jobSizes").val().split(" ").join(""));
  var jobs = $("#jobSizes").val().split(","), partitions = $("#partitionSizes").val().split(",");

  // Parse both arrays string values into int's
  var temp = [];
  for (i = 0; i < jobs.length; i++) {
    if (jobs[i] !== "") temp.push(parseInt(jobs[i]));
  }
  jobs = temp;
  temp = [];
  for (i = 0; i < partitions.length; i++) {
    if (partitions[i] !== "") { temp.push(parseInt(partitions[i])); }
  }
  partitions = temp;

  // Acquire the algorithm type (selected by the user)
  var algs = document.getElementsByName("mem_algorithm"), checked;
  for (i = 0; i < algs.length; i++) {
    if (algs[i].checked) {
      checked = algs[i].id;
      break;
    }
  }

  // Clear the output div before placing new data
  $("#output").html("");

  // Apply the dynamic or fixed memory scheme (selected by the user)
  if (document.getElementsByName("mem_type")[0].checked) {
    determinAlgorithm("dynamic", checked, partitions, jobs);
  } else {
    determinAlgorithm("fixed", checked, partitions, jobs);
  }
});
