/*
---------------------------------------------------------------------------------
colors
---------------------------------------------------------------------------------
*/


function rgb_from_hex(hex) {
	let r = parseInt(hex[1] + hex[2], 16)
	let g = parseInt(hex[3] + hex[4], 16)
	let b = parseInt(hex[5] + hex[6], 16)
	return { r:r, g:g, b:b }
}


// linear blend between two colors {r, g, b} (0-255). t is blend value 0-1.
function blend_rgb(a, b, t) {
	return { r: Math.floor((1 - t) * a.r + t * b.r),
			 g: Math.floor((1 - t) * a.g + t * b.g),
			 b: Math.floor((1 - t) * a.b + t * b.b) }
}


function hex_from_rgb(color) {
	let r = color.r.toString(16).padStart(2, "0")
	let g = color.g.toString(16).padStart(2, "0")
	let b = color.b.toString(16).padStart(2, "0")
	let string = "#" + r + g + b
	return string
}


// test output. prints all the intermediate colors from a to b to the console
function test_blend(a, b) {
	let a_rgb = rgb_from_hex(a)
	let b_rgb = rgb_from_hex(b)
	for (let t = 0; t <= 1; t += 0.1) {
		let color = blend_rgb(a_rgb, b_rgb, t)
		console.log("r: " + color.r + "g: " + color.g + "b: " + color.b + " (t = " + t + ")")
	}
}



// for blending between two colors. this precomputes render-ready hex colors, precomputed to avoid run-time cost. a and b are colors {r, g, b}. table size is the number of steps, noninclusive, to get from a to b. note that if you input 4, you will actually get a table with 5 values, because that way it takes 4 steps to get from 1 to 0, or 0 to 1
function initialize_blend_table(a, b, table_size) {
	table = []
	let a_rgb = rgb_from_hex(a)
	let b_rgb = rgb_from_hex(b)
	for (let a = 0; a <= table_size; a ++) {
		let t = a / table_size
		let output_rgb = blend_rgb(a_rgb, b_rgb, t)
		table.push(hex_from_rgb(output_rgb))
	}
	return table
}