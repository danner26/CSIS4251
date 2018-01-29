/* Main Methods */
// Parse the user entered string, and throw an error if expression is invalid
function parsePreOrder(str) {
    // Build Regex for Parsing
    // Regex for numbers, Regex for operators, Regex for whitespace
    var parser = new RegExp([/\d+(?:\.\d*)?|\.\d+/.source,[".", "(", ")"].concat(sNode.operands, bNode.operands).map(characterize).join("|"), /[a-zA-Z$_][a-zA-Z0-9$_]*/.source, /\S/.source].map(s => "("+ s +")").join("|"), "g");
    var tks = []; // array of tokens once seperated and objectified properly
    // using String.replace as a forEach function
    str.replace(parser, function(tk, num, operand) {
        if(num) { tk = new numNode(num); }
        else if(!operand) { throw new Error("unexpected token '"+tk+"'"); }
        tks.push(tk);
    });

    // Loop through the tokens and process each split at ()'s'
    for(var i, j; (i = tks.lastIndexOf("(")) > -1 && (j=tks.indexOf(")", i)) > -1;){ tks.splice(i, j+1-i, processSplit(tks.slice(i+1, j))); }
    // Check for mismatching parentheses
    if(~tks.indexOf("(") || ~tks.indexOf(")")) throw new Error("mismatching parentheses");

    return processSplit(tks); // Return the output of the nodes, after we splice then into a single node
}


function processSplit(tks){
    // Sort through each single node
    sNode.operands.forEach(tk => {
        for(var i=-i; (i=tks.indexOf(tk, i+1)) > -1;) tks.splice(i, 2, new sNode(tk, tks[i+1])); // Splice each sNode, and create new sNode's where applicable
    })

    // Sort through each binary node
    bNode.operands.forEach(tk => {
        for(var i=1; (i=tks.indexOf(tk, i-1)) > -1;) tks.splice(i-1, 3, new bNode(tk, tks[i-1], tks[i+1])); // Splice each bNode, and create new bNode's where applicable
    });

    return tks[0]; // Return spliced results as a single token
}

/* Utility Methods */
// For looping through each operand [.()^*/+-]
function characterize(str) {
    return String(str).replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&');
}
