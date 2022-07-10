var canvas = document.querySelector('canvas');

let window_height = 500;
let window_width =  500;

// set dimenstions of the canvas
canvas.height = window_height;
canvas.width = window_width;
// debugger;
let cell_size = 20;
let num_horizontal_cells = Math.floor(window_width/cell_size);
let num_vertical_cells = Math.floor(window_height/cell_size);

console.log('horizontal cells: ', num_horizontal_cells);
console.log('vertical cells: ', num_vertical_cells);

var rendering_context = canvas.getContext('2d');
console.log("rendering_context:", rendering_context);

rendering_context.fillStyle = "#ff0000";
rendering_context.strokeStyle = 'black';

// draw a rectangle with fill and stroke
for(let i=0; i<=num_vertical_cells; i++) {
    for(let j=0; j<=num_horizontal_cells; j++) {
        rendering_context.strokeRect(j*cell_size, i*cell_size, cell_size, cell_size);
    }
}