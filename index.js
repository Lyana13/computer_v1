if (process.argv[2] === undefined)
	console.log("Wrong number of arguments!");
else
	solveEquation(process.argv[2]);

function solveEquation(e){
	let res = parseEquation(e);
	console.log("res", res);
	if ((typeof res) == "string") {
		console.log(res);
		return undefined;
	}
	var reduced = moveRightPart(res);
	console.log("reduced", reduced);
	printReducedForm(reduced);
	let maxDegree = reduced.length ? reduced[reduced.length - 1][1] : 0;
	console.log("Polynomial degree: " + maxDegree);
	if (maxDegree > 2)
		console.log("The polynomial degree is stricly greater than 2, I can't solve.");
	else
		solveReducedEquation(reduced, maxDegree);
};

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
		console.log(r  + " + " + ir  + " * i");
		console.log(r  + " - " + ir  + " * i");
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

function solveReducedEquation(reduced, degree){
	let c = getCoef(reduced, 0);
	let b = getCoef(reduced, 1);
	let a = getCoef(reduced, 2);
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

function getCoef(reduced, deg){
	return reduced.reduce((acc, x) => x[1] == deg ? x[0] : acc, 0);
}

function printReducedForm(reduced){
	let coef;

	finalStr = reduced.map(function(num, idx) {
		if (num[0] >= 0 && idx != 0)
			coef = " + " + num[0];
		else if (num[0] < 0)
			coef = " - " + (num[0] * -1);
		else
			coef = num[0]
		return  coef + " * X^" + num[1]
	}).join("");
	finalStr = finalStr ? finalStr : "0";
	console.log("Reduced form: " + finalStr + " = 0");	
}

function moveRightPart(array){
	[left, right] = array;
	right = right.map(x => [x[0] * (-1), x[1]]);
	console.log("right", right);
	left = left.map((x, idx) => [x[0] + right[idx][0], x[1]]);
	return left.filter(nums => nums[0] != 0);
}

function parseEquation(e){
	let left;
	let right;

	e = e.replace(/\s/g, "");
	[left, right] = e.split("=");
	let degrees = getDegrees(e);
	return [parsePart(left, degrees), parsePart(right, degrees)];
}

function getDegrees(e) {
	let match = e.match(/\^\d+/g);
	let degrees = match ? match.map(n => Number(n.substr(1))) : [];
	degrees.push(0, 1);
	return Array.from(new Set(degrees));
}

function parsePart(part, degrees){
	let res = degrees.map(d => [aggreagateCoef(part, d), d]);
	return res.sort((a, b) => a[1] - b[1]);
}

function aggreagateCoef(part, deg) {
	let res;
	let acc = [];

	res = part.match(new RegExp("([-,+]?\\d+(\\.\\d+)?)\\*X\\^" + deg, "g"));
	acc = maybeConcat(acc, res, x => Number(x.match(/(.+)\*/)[1]));
	res = part.match(new RegExp("(\\+|-|^)X\\^" + deg, "g"));
	acc = maybeConcat(acc, res, x => x[0] == '-' ? -1 : 1);
	if (deg == 0){
		res = part.replace(/[-,+]?\d+(\.\d+)?\*X(\^\d+)?/g, "").match(/(\+|-|^)\d+(\.\d+)?/g);
		acc = maybeConcat(acc, res, x => Number(x));
	}
	if (deg == 1){
		res = part.match(/[-,+]?\d+(\.\d+)?\*X(\+|-|$)/g);
		acc = maybeConcat(acc, res, x => Number(x.match(/(.+)\*/)[1]));
		res = part.match(/(\+|-|^)X(\+|-|$)/g);
		acc = maybeConcat(acc, res, x => x[0] == '-' ? -1 : 1);
	} 
	return acc.reduce((a, b) => a + b, 0);
}


function maybeConcat(acc, res, cb){
	if (res != null){
		acc = acc.concat(res.map(cb));
	}
	return acc;
}
// X^0
// eq.replace(/[-,+]?\d+(\.\d+)?\*X\^\d+/g, "").match(/(\+|-|^)\d+(\.\d+)?/g).map(x => Number(x))
// eq.match(/([-,+]?\d+(\.\d+)?)\*X\^0/g).map(x => Number(x.match(/(.+)\*/)[1]))
// eq.match(/(\+|-|^)X\^0/g).map(str => str[0] == '-' ? -1 : 1)

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

