if (process.argv[2] === undefined)
 console.log("Wrong number of arguments!");
else
 solveEquation(process.argv[2]);

function solveEquation(e){
	let res;
	res = parseEquation(e);
	// console.log(res);
	if ((typeof res) == "string") {
		// console.log(res);
		return undefined;
	}
	var reduced = moveRightPart(res);
	printReducedForm(reduced);
	let degree = getDegree(reduced);
	console.log("Polynomial degree: " + degree);
	solverDiscriminant(reduced);
	// console.log("LO", minus);
};

function getDegree(reduced){
	let idx = reduced.length - 1;
	while (reduced[idx] == 0)
		// && idx <= 2
		idx--;
	return idx;
}

function solverDiscriminant(reduced){
	[c, b, a] = reduced;
	let dis = (b * b) - (4 * a * c);
	if (dis > 0){
		console.log("Discriminant:", dis);
		let x1 = (-b - Math.sqrt(dis)) / (2 * a);
		let x2 = (-b + Math.sqrt(dis)) / (2 * a);
		console.log("Discriminant is strictly positive, the two solutions are:");
		console.log(x1.toFixed(6));
		console.log(x2.toFixed(6));
	}
	 else if (dis == 0){
	 	let x0 = -b / (2*a);
	 	console.log("Discriminant is strictly equal to zero.", x0);
	}
	else if (dis < 0){
		 console.log("Discriminant is strictly negative, no real solution.");
	}
	else
	{
		return ;
	}
	
}

function printReducedForm(reduced){
	finalStr = reduced.map(function(num, idx) {
		if (num >= 0 && idx != 0)
			num = " + " + num;
		else if (num < 0)
			num = " - " + (num * -1);
		return  num  + " * X^" + idx
	}).join("");
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

