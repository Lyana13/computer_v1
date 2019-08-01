if (process.argv[2] === undefined)
 console.log("Invalid");
else
 solveEquation(process.argv[2]);

function solveEquation(e){
	let res;
	res = parseEquation(e);
	console.log(res);
	if ((typeof res) == "string") {
		console.log(res);
		return undefined;
	}
};

function parseEquation(e){
let left;
let right;

e = e.replace(/\s/g, "");
[left, right] = e.split("=");
return [parsePart(left), parsePart(right)];
 // return "string";
}

function parsePart(part){
  return [0, 1, 2];
// part.match(/X\^([3-9]$|\d{2,}$)/g);
};


// Reduced form:
// Polynomial degree:
// Discriminant is strictly positive, the two solutions are:

// var str = "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0";
//console.log(str.replace(/\s/g, ""));

// "-199".match(/-?\d+/g);

// "+8".match(/[-,+]?\d+/g);
// "9090.".match(/^[-,+]?\d+(.\d+)?$/g);
// "9090.76*X^9898".match(/[-,+]?\d+(.\d+)?\*X(\^\d+)?/g);

// "X^356798986986".match(/X\^([3-9]$|\d{2,}$)/g);

