if (process.argv[2] === undefined)
	console.log("Wrong number of arguments!");
else
	solveEquation(process.argv[2]);

function solveEquation(e){
	let sides = parseEquation(e);
	if (sides == undefined) {
		console.log("Invalid equation.");
		return undefined;
	}
	console.log("After parsing: ", sides);
	let operands = moveRightSide(sides);
	console.log("After moving of right side: ", operands);
	let reduced = reduceEquation(operands);
	console.log("After reducing:", reduced);
	printReducedForm(reduced);
	let maxDegree = reduced.length ? reduced[reduced.length - 1][1] : 0;
	console.log("Polynomial degree: " + maxDegree);
	if (maxDegree > 2)
		console.log("The polynomial degree is stricly greater than 2, I can't solve.");
	else
		solveReducedEquation(reduced, maxDegree);
};

function parseEquation(e) {
	e = e.replace(/\s/g, "");
	let sides = e.split("=");
	if (sides.length != 2)
		return undefined;
	let left = parseSide(sides[0]);
	if (left == undefined)
		return undefined;
	let right = parseSide(sides[1]);
	if (right == undefined)
		return undefined;
	return [left, right];
}

function parseSide(side) {
	let match;
	let coef;
	let degree;
	let parsed = [];

	if (side == "")
		return undefined;
	side = side[0] != '+' && side[0] != '-' ? '+' + side : side;
	while (side != "") {
		if (match = side.match(/^([-,+]\d+(\.\d+)?)\*(x|X)\^(\d+)/)) {
			coef = Number(match[1]);
			degree = Number(match[4]);
		}
		else if (match = side.match(/^([-,+]\d+(\.\d+)?)\*(x|X)/)) {
			coef = Number(match[1]);
			degree = 1;
		}
		else if (match = side.match(/^([-,+])(x|X)\^(\d+)/)) {
			coef = match[1] == '-' ? -1 : 1;
			degree = Number(match[3]);
		}
		else if (match = side.match(/^([-,+])(x|X)/)) {
			coef = match[1] == '-' ? -1 : 1;
			degree = 1;
		}
		else if (match = side.match(/[-,+]\d+(\.\d+)?/)) {
			coef = Number(match[0]);
			degree = 0;
		} 
		else {
			return undefined;
		}
		parsed.push([coef, degree]);
		side = side.substr(match[0].length)
	}
	return parsed;
}

function moveRightSide(sides) {
	let left = sides[0];
	let right = sides[1];
	right.forEach(x => {
		left.push([-x[0], x[1]])
	});
	return left;
}

function reduceEquation(operands) {
	let coef;
	let map = new Map();
	operands.forEach(x => {
		coef = map.get(x[1]);
		coef = coef ? coef + x[0] : x[0]; 
		map = map.set(x[1], coef);
	});
	let arr = Array.from(map);
	arr = arr.map(x => [x[1], x[0]]);
	arr = arr.filter(x => x[0] != 0);
	arr = arr.sort((a, b) => a[1] - b[1]);
	return arr;
};

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

function solveReducedEquation(reduced, degree){
	let c = getCoef(reduced, 0);
	let b = getCoef(reduced, 1);
	let a = getCoef(reduced, 2);
	if (degree == 2){
		solveSquareEquation(c, b, a);
	}
	else if (degree == 1) {
		solveLinearEquation(c, b);
	}
	else if (degree == 0) {
		if (c == 0)
			console.log("Solution is any real number.");
		else
			console.log("There are no solutions.");
	}
}

function solveSquareEquation(c, b, a){
	let dis = (b * b) - (4 * a * c);
	console.log("Discriminant: ", b, "*", b, "- 4 *", a, "*", c, "=", dis);
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

function getCoef(reduced, deg){
	return reduced.reduce((acc, x) => x[1] == deg ? x[0] : acc, 0);
}
