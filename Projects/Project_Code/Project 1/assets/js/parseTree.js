/*
* FILENAME :        main.js
*
* DESCRIPTION :
*       Script that parses the user input, and adds the proper nodes to the tree
*
* NOTES :
*       I got lazy and didnt want to rewrite all of the code to make the tree diagram work, so this will add the data to 2 seperate trees
*       If I had more time I would have went through the process of converting everything into one tree to be sorted through. This uses the
*       addToTree() and return processSplit() to return values to the 2 trees - see tree.js and draw/createTreeOnPage.js
*
* AUTHOR :    Daniel W. Anner - Z00231757 - Program #1 - CSIS4251
*/
// Parse the user entered string, and throw an error if expression is invalid
function parseTree(str) {
    // Build Regex for Parsing
    // Regex for numbers, Regex for operators, Regex for whitespace
    var parser = new RegExp([/\d+(?:\.\d*)?|\.\d+/.source,[".", "(", ")"].concat(sNode.operands, bNode.operands).map(characterize).join("|"), /[a-zA-Z$_][a-zA-Z0-9$_]*/.source, /\S/.source].map(s => "("+ s +")").join("|"), "g");
    var tks = []; // array of tokens once seperated and objectified properly
    // using String.replace as a forEach function
    str.replace(parser, function(tk, num, operand) {
        if(num) { tk = new numNode(num); }
        else if(!operand) {
          var newError = document.createElement('p'); // create an "invisible" (empty) element
          newError.innerHTML = 'ERROR! Please try another input. <b style="weight: bolder;">' + tk + '</b> is not a valid input.'; // add the text and error character to the new element
          newError.setAttribute('class', 'error'); // add the class "error" to our new element
          document.getElementById('errors').appendChild(newError); // append the element to our div that contains all other errors
          throw new Error("unexpected token '"+ tk +"'"); // throw an exception to end the script process and log it to the console
        }
        tks.push(tk);
    });

    //console.log(parser);
    //console.log(tks[1]);

    // Loop through the tokens and process each split at ()'s'
    for(i, j; (i = tks.lastIndexOf("(")) > -1 && (j=tks.indexOf(")", i)) > -1;){ tks.splice(i, j+1-i, processSplit(tks.slice(i+1, j))); }
    // Check for mismatching parentheses
    if(~tks.indexOf("(") || ~tks.indexOf(")")) {
        var newError = document.createElement('p'); // create an "invisible" (empty) element
        newError.innerHTML = 'ERROR! Please try another input. <b style="weight: bolder;">' + tk + '</b> is not a valid input in this place.'; // add the text and error character to the new element
        newError.setAttribute('class', 'error'); // add the class "error" to our new element
        document.getElementById('errors').appendChild(newError); // append the element to our div that contains all other errors
        throw new Error("mismatching parentheses"); // throw an exception to end the script process and log it to the console
    }

    // I got lazy and decided to structre the tree another way for the display, but I did not feel like rewritting the code I already wrote for the traversals.. so here we are
    for (i = 0; i < tks.length; i++) {
        if (tks[i].value) addToTree(tks[i].value) // Add each "value" to the new tree (operands and values are different in this old tree) :D
        else addToTree(tks[i]) // Add each operand to the new tree!
    }

    return processSplit(tks); // Return the output of the nodes, after we splice then into a single node
}


function processSplit(tks){
    // Sort through each single node
    sNode.operands.forEach(tk => {
        for(i=-i; (i=tks.indexOf(tk, i+1)) > -1;) tks.splice(i, 2, new sNode(tk, tks[i+1])); // Splice each sNode, and create new sNode's where applicable
    })

    // Sort through each binary node
    bNode.operands.forEach(tk => {
        for(i=1; (i=tks.indexOf(tk, i-1)) > -1;) tks.splice(i-1, 3, new bNode(tk, tks[i-1], tks[i+1])); // Splice each bNode, and create new bNode's where applicable
    });
    return tks[0]; // Return spliced results as a single token
}

/* Utility Methods */
// Simple regex for looping through each operand [.()^*/+-]
function characterize(str) {
    return String(str).replace(/[.*+?^=!:${}()|[\]\\]/g, '\\$&');
}
