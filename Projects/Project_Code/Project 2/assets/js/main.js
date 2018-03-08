/* * FILENAME :        main.js
*
* DESCRIPTION :
*       Main part of the script dedicated to running all of the combined scripts after a user clicks the Convert! button
*
* NOTES :
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251 */
$("#evaluate").on("click", function(e) {
  e.preventDefault(); //Prevent the default "submit" action

  // Acquire the job sizes and parse them into an array
  $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(' ').join(''));
  $("textarea#jobSizes").val($("textarea#jobSizes").val().split(' ').join(''));
  var jobs = $("#jobSizes").val().split(","), partitions = $("#partitionSizes").val().split(",");

  // Parse both arrays string values into int's
  var temp = [];
  for (i = 0; i < jobs.length; i++) {
    if (jobs[i] != "") temp.push(parseInt(jobs[i]));
  }
  jobs = temp;
  temp = [];
  for (i = 0; i < partitions.length; i++) {
    if (partitions[i] != "") temp.push(parseInt(partitions[i]));
  }
  partitions = temp;

  // Acquire the algorithm type (selected by the user)
  var algs = document.getElementsByName('mem_algorithm');
  for (i = 0; i < algs.length; i++) {
    if (algs[i].checked) {
      var checked = algs[i].id;
      break;
    }
  }

  // Clear the output div before placing new data
  $("#output").html('');

  // Apply the dynamic or fixed memory scheme (selected by the user)
  if (document.getElementsByName('mem_type')[0].checked) {
    determinAlgorithm('dynamic', checked, partitions, jobs);
  } else {
    determinAlgorithm('fixed', checked, partitions, jobs);
  }
});

function determinAlgorithm(partitionType, algorithmType, partitions, jobs) {
  // Combine the partition type and the algorithm type and send it to the proper function
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
      alert("Please ensure you select a Type of Memory AND a Type of Scheme");
      return;
  }
}

/* On start these functions are loaded */
document.addEventListener('DOMContentLoaded', function () {
  // Add listner to increase button to increase the value box by 1
  $('.increase').on('click', function () {
    var oldValue = $(this).parent().find("input").val();

    if (oldValue >= 1) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      newVal = 1;
    }
    $(this).parent().find("input").val(newVal);
  });
  // Add listner to decrease button to decrease the value box by 1
  $(".decrease").on("click", function() {
    var oldValue = $(this).parent().find("input").val();

    if (oldValue > 1) {
      var newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 1;
    }
    $(this).parent().find("input").val(newVal);
  });
  // Everytime a user types, it will check if the key is a number or a space, otherwise it doesnt allow it
  // If there is a space in the field, it will remove and replace it with a comma
  $('textarea').keypress(function(e) {
    var a = [],
      k = e.which;

    for (i = 48; i < 58; i++)
      a.push(i);

    if (!(a.indexOf(k) >= 0) && !(k == 32) && !(k == 44)) e.preventDefault();

    $("textarea#partitionSizes").val($("textarea#partitionSizes").val().split(' ').join(','));
    $("textarea#jobSizes").val($("textarea#jobSizes").val().split(' ').join(','));
  });
});

// Basic function to load examples on radio button selection
function changeDefaultText(element) {
  if (!(document.getElementById('toChangeText').checked)) {
    switch (element) {
      case "alg_bestFit":
        $("textarea#partitionSizes").val("400,200,300,100,500");
        $("textarea#jobSizes").val("380,290,200,600,200");
        return;
      case "alg_firstFit":
        $("textarea#partitionSizes").val("400,200,300,100,500");
        $("textarea#jobSizes").val("150,300,350,100,600");
        return;
      case "alg_nextFit":
        $("textarea#partitionSizes").val("400,200,300,100,500");
        $("textarea#jobSizes").val("380,290,200,600,200");
        return;
      case "alg_worstFit":
        $("textarea#partitionSizes").val("400,200,300,100,500");
        $("textarea#jobSizes").val("380,290,200,600,200");
        return;
    }
  }
}
