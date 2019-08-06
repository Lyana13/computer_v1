if (process.argv[2] === undefined)
	console.log("Wrong number of arguments!");
else
	solveEquation(process.argv[2]);

function solveEquation(e){
	let res;
	res = parseEquation(e);
	if ((typeof res) == "string") {
		console.log(res);
		return undefined;
	}
	var reduced = moveRightPart(res);
	printReducedForm(reduced);
	solveReducedEquation(reduced);
	// console.log("LO", minus);
};

function getDegree(reduced){
	let idx = reduced.length - 1;
	while (reduced[idx] == 0 && idx > 0)
		idx--;
	return idx;
}

function solveSquareEquation(c, b, a){
	let dis = (b * b) - (4 * a * c);
	console.log("Discriminant:", dis);
	if (dis > 0){
		let x1 = (-b - Math.sqrt(dis)) / (2 * a);
		let x2 = (-b + Math.sqrt(dis)) / (2 * a);
		console.log("Discriminant is strictly positive, the two solutions are:");
		console.log(round(x1));
		console.log(round(x2));
	}
	else if (dis == 0){
	 	let x = -b / (2 * a);
	 	console.log("Discriminant is strictly equal to zero, the solution is:");
	 	console.log(round(x));
	}
	else {
		let r = -b / (2 * a);
		let ir = Math.sqrt(dis * -1) / (2 * a);
		r = round(r);
		ir = round(ir);
		console.log("Discriminant is strictly negative, the two solutions are:");
		console.log(r  + " + " + ir  + "i");
		console.log(r  + " - " + ir  + "i");
	}
}

function solveLinearEquation(c, b){
	let res = -c / b;
	console.log("The solution is: ");
	console.log(round(res));
}

function round(num) {
	return Math.round(num * 1000000) / 1000000;
}

function solveReducedEquation(reduced){
	[c, b, a] = reduced;
	let degree = getDegree(reduced);
	console.log("Polynomial degree: " + degree);
	if (degree == 2){
		solveSquareEquation(c, b, a);
	}
	else if (degree == 1) {//линейное уравне а = 0
		solveLinearEquation(c, b);
	}
	else if (degree == 0) {
		if (c == 0)
			console.log("Solution is any real number.");//если ним одинаковыцй с = 0 и 0 степень то решением если подставить в икс будет рано любое число 
		else
			console.log("There are no solutions.");
	}
}

function printReducedForm(reduced){
	finalStr = reduced.map(function(num, idx) {
		if (num == 0)
			return "";
		if (num >= 0 && idx != 0)
			num = " + " + num;
		else if (num < 0)
			num = " - " + (num * -1);
		return  num  + " * X^" + idx
	}).join("");
	finalStr = finalStr ? finalStr : "0";
	console.log("Reduced form: " + finalStr + " = 0");	
}

function moveRightPart(array){
	[left, right] = array;
	right = right.map(function(x) { return x * (-1); });
	return left.map(function(num, idx) { return right[idx] + num; });
}

function parseEquation(e){
	let left;
	let right;

	if (e.match(/X\^([3-9]|\d{2,})/g))
		return "The polynomial degree is stricly greater than 2, I can't solve.";
	e = e.replace(/\s/g, "");
	[left, right] = e.split("=");
	return [parsePart(left), parsePart(right)];
}


function matchDegree(part, deg) {
	let regex = new RegExp("([-,+]?\\d+(\\.\\d+)?)\\*X\\^" + deg);
	let num = part.match(regex);
 	return num == null ? 0 : Number(num[1]);
}

function parsePart(part){
	let c = matchDegree(part, 0);
	let b = matchDegree(part, 1);
	let a = matchDegree(part, 2);
	return [c, b, a];
}

// X^0
// eq.match(/([-,+]|^)\d+(\.\d+)?([-,+]|$)/g).map(x => Number(x.match(/[-,+]?\d+(\.\d+)?/)[0]))
// eq.match(/([-,+]?\d+(\.\d+)?)\*X\^0/g).map(x => Number(x.match(/(.+)\*/)[1]))
// eq.match(/([+,-]|^)X\^0/g).map(str => str[0] == '-' ? -1 : 1)

//.match(/={2,}/g);-больше 1 раc(Two '=' signs in string")
// part.match(/X\^([3-9]$|\d{2,}$)/g);
//part.match(/[-,+]/g);

// Reduced form:
// Polynomial degree:
// Discriminant is strictly positive, the two solutions are:
// The solution is:
//The polynomial degree is stricly greater than 2, I can't solve.



// ./computor 
// Reduced form: 
// Polynomial degree:
// Discriminant is strictly positive, the two solutions are:
// The solution is:
// The polynomial degree is stricly greater than 2, I can't solve.

// var str = "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0";
//console.log(str.replace(/\s/g, ""));

// "-199".match(/-?\d+/g);

// "+8".match(/[-,+]?\d+/g);
// "9090.".match(/^[-,+]?\d+(.\d+)?$/g);
// "9090.76*X^9898".match(/[-,+]?\d+(.\d+)?\*X(\^\d+)?/g);

// "X^356798986986".match(/X\^([3-9]$|\d{2,}$)/g);

