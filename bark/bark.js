function bark (name, weight) {
	if (weight > 20) {
		console.log(name + ' says WOOF WOOF ' + weight);
	} else {
		console.log(name + ' says woof woof ' + weight);
	}
}
// если аргумент не передан в функцию - то он заполняется значением undefined
// если передано больше аргументов, чем определено параметов - функция их игнорирует
bark('rover', 23);
bark('scottie', -1);
bark('dino', 0, 0);
bark('fido', '20');


var flavors = ["vanilla", "butterscotch", "lavender", "chocolate", "cookie dough"];

console.log(flavors[1]);
// последний элемент массива
console.log(flavors[flavors.length - 1]);