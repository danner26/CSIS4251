/* This is basically just a constructor class that defines each type of node (object), and defines the operands order of operations */
// Base Node
class Base {
    constructor() { Object.defineProperty(this,"parent",{writable: true,value: null}); } // Constructor method
    toString() { throw new Error("not implemented") } // toString to print result
}

// Number nodes
class numNode extends Base{
    constructor(val) { super(); this.value=val; } // Constructor method
    toString(){ return JSON.stringify(this.value); } // toString to print result
}

// Single nodes
class sNode extends Base{
    constructor(operand, node) { super(); this.operand=operand; this.node=node; node.parent=this; } // Constructor method
    toString() { return  "( " + this.operand + " " + this.node.toString() + " )"; } // toString to print result
}

// Middle nodes
class bNode extends Base{
    constructor(operand, lNode, rNode) { super();this.operand=operand;this.left=lNode;this.right=rNode;lNode.parent=this;rNode.parent=this; } // Constructor method
    toString() { return "( " + this.left.toString() + " " + this.operand + " " + this.right.toString() + " )"; } // toString to print result
}

// Defines operands applicable in the tree, as well as defines operand precendence
sNode.operands=[ "." ];
bNode.operands=[ "^","*","/","+","-", ];
