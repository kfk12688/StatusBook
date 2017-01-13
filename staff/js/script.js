document.write("Hello!");


$("#edittable").editTable({
	data: [
		["01/01/2013","01/30/2013","50,00 €"],
		["02/01/2013","02/28/2013","50,00 €"]
	],
	headerCols: [
		'From',
		'To',
		'Price'
	],
	maxRows: 3
});