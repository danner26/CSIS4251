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
  $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(' ').join(''));
  $("textarea#jobSizes").val($("textarea#jobSizes").val().split(' ').join(''));
  var jobs = $('#jobSizes').val().split(','), partitions = $('#partitionSizes').val().split(',');

  // Parse both arrays string values into int's
  var temp = [];
  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i] != "") temp.push(parseInt(jobs[i]));
  }
  jobs = temp;
  temp = [];
  for (var i = 0; i < partitions.length; i++) {
    if (partitions[i] != "") temp.push(parseInt(partitions[i]));
  }
  partitions = temp;

  var algs = document.getElementsByName('mem_algorithm');
  for (i = 0; i < algs.length; i++) {
    if (algs[i].checked) { var checked = algs[i].id; break; }
  }

  $("#output").html('');

  if (document.getElementsByName('mem_type')[0].checked) {
    // Dynamic partitions is checked
    determinAlgorithm('dynamic', checked, partitions, jobs);
  } else {
    // Fixed partitions is checked
    determinAlgorithm('fixed', checked, partitions, jobs);
  }
});

function determinAlgorithm(partitionType, algorithmType, partitions, jobs) {
  switch (partitionType + "|" + algorithmType) {
    case "dynamic|alg_best":
      return d_bestFit(partitions, jobs);
    case "dynamic|alg_first":
      return d_firstFit(partitions, jobs);
    case "dynamic|alg_next":
      return d_nextFit(partitions, jobs);
    case "dynamic|alg_worst":
      return d_worstFit(partitions, jobs);
    case "fixed|alg_best":
      return f_bestFit(partitions, jobs);
    case "fixed|alg_first":
      return f_firstFit(partitions, jobs);
    case "fixed|alg_next":
      return f_nextFit(partitions, jobs);
    case "fixed|alg_worst":
      return f_worstFit(partitions, jobs);
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
    $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(' ').join(','));
    $("textarea#jobSizes").val($("textarea#jobSizes").val().split(' ').join(','));
  });
});
