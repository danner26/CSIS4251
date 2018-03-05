/* * FILENAME :        main.js
*
* DESCRIPTION :
*       Main part of the script dedicated to running all of the combined scripts after a user clicks the Convert! button
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251 */
$("#evaluate").on("click", function(e) {
  e.preventDefault();

  // Get the job sizes and parse them into an array
  var jobs = $('#jobSizes').val().split(','), partitions = $('#partitionSizes').val().split(',');

  var algs = document.getElementsByName('mem_algorithm');
  for (i = 0; i < algs.length; i++) {
    if (algs[i].checked) { var checked = algs[i].id; break; }
  }

  if (document.getElementsByName('mem_type')[0].checked) {
    // Dynamic partitions is checked
    determinAlgorithm('dynamic', checked, jobs, partitions);
  } else {
    // Fixed partitions is checked
    determinAlgorithm('fixed', checked, jobs, partitions);
  }
});

function determinAlgorithm(partitionType, algorithmType, jobs, partitions) {
  console.log(algorithmType);
  switch (partitionType + "|" + algorithmType) {
    case "dynamic|alg_best":
      return dynamicBestFit(partitions, jobs);
    case "dynamic|alg_first":
      return dynamicFirstFit(partitions, jobs);
    case "dynamic|alg_next":
      return dynamicNextFit(partitions, jobs);
    case "dynamic|alg_worst":
      return dynamicWorstFit(partitions, jobs);
    case "fixed|alg_best":
      return fixedBestFit(partitions, jobs);
    case "fixed|alg_first":
      return fixedFirstFit(partitions, jobs);
    case "fixed|alg_next":
      return fixedNextFit(partitions, jobs);
    case "fixed|alg_worst":
      return fixedWorstFit(partitions, jobs);
    default:
      console.log("This shouldn't happen!");
      return;
  }
}

/* On start these functions are loaded */
$(function() {
  $(".increase").on("click", function() {
    var oldValue = $(this).parent().find("input").val();

    if (oldValue > 1) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      newVal = 1;
    }
    $(this).parent().find("input").val(newVal);
  });
  $(".decrease").on("click", function() {
    var oldValue = $(this).parent().find("input").val();

    if (oldValue < 1) {
      var newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 1;
    }
    $(this).parent().find("input").val(newVal);
  });

  $('textarea').keypress(function(e) {
    var a = [],
      k = e.which;

    for (i = 48; i < 58; i++)
      a.push(i);

    if (!(a.indexOf(k) >= 0) && !(k == 32) && !(k == 44))
      e.preventDefault();
    else if (k == 32) {
      console.log(e);
    }
  });
});
