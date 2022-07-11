let canvas;
let window_height;
let window_width;
let cell_size = 50;
let num_horizontal_cells;
let num_vertical_cells;
let rendering_context;

const tiles = {
  0: {
    image_src: "./tiles/blank.png",
    edges: [0, 0, 0, 0],
  },
  1: {
    image_src: "./tiles/up.png",
    edges: [1, 1, 0, 1],
  },
  2: {
    image_src: "./tiles/right.png",
    edges: [1, 1, 1, 0],
  },
  3: {
    image_src: "./tiles/down.png",
    edges: [0, 1, 1, 1],
  },
  4: {
    image_src: "./tiles/left.png",
    edges: [1, 0, 1, 1],
  },
};

function getTile(required_top_left_edge) {
  let possibleTiles = [];
  for (tile in tiles) {
    let currentTile = tiles[tile];
    if (
      (currentTile.edges[0] == required_top_left_edge.top &&
        currentTile.edges[3] == required_top_left_edge.left) ||
      (currentTile.edges[0] == required_top_left_edge.top &&
        required_top_left_edge.left == -1) ||
      (required_top_left_edge.top == -1 &&
        currentTile.edges[3] == required_top_left_edge.left) ||
      (required_top_left_edge.top == -1 && required_top_left_edge.left == -1)
    ) {
      possibleTiles.push(tile);
    }
  }
  if (possibleTiles.length > 1) {
    let random_num = Math.floor(Math.random() * possibleTiles.length);
    return possibleTiles[random_num];
  } else if (possibleTiles.length == 1) {
    return possibleTiles[0];
  } else {
    return 0;
  }
}

let grid = [];

function draw() {
  let flat_grid = grid.flat();

  flat_grid.forEach((cell) => {
    rendering_context.drawImage(
      cell.image,
      cell.loc_x,
      cell.loc_y,
      cell_size,
      cell_size
    );
  });
}

function evaluateCells() {
  for (let i = 0; i <= num_vertical_cells; i++) {
    for (let j = 0; j <= num_horizontal_cells; j++) {
      if (grid[i] == undefined) {
        grid[i] = [];
      }
      // rendering_context.strokeRect(j*cell_size, i*cell_size, cell_size, cell_size);
      let required_top_left_edge = {
        top: -1,
        left: -1,
      };
      // check bottom edge of the cell on top of the current one.
      if (!(i - 1 < 0)) {
        required_top_left_edge.top = grid[i - 1][j].tile.edges[2];
      }
      // check right edge of the cell to the left.
      if (!(j - 1 < 0)) {
        required_top_left_edge.left = grid[i][j - 1].tile.edges[1];
      }
      let tile = tiles[getTile(required_top_left_edge)];

      let image = new Image(cell_size, cell_size);
      image.src = tile.image_src;

      grid[i][j] = {
        i,
        j,
        loc_x: j * cell_size,
        loc_y: i * cell_size,
        cell_size,
        required_top_left_edge,
        tile,
        image,
      };
    }
  }

  console.log(grid);
  draw();
}

function prepareCanvas() {
  canvas = document.querySelector("canvas");

  window_height = window.innerHeight;
  window_width = window.innerWidth;

  // set dimenstions of the canvas
  canvas.height = window_height;
  canvas.width = window_width;
  num_horizontal_cells = Math.floor(window_width / cell_size) - 1;
  num_vertical_cells = Math.floor(window_height / cell_size) - 1;

  rendering_context = canvas.getContext("2d");
  console.log("rendering_context:", rendering_context);

  rendering_context.fillStyle = "#ff0000";
  rendering_context.strokeStyle = "black";
  evaluateCells();
}

window.addEventListener("load", (_) => prepareCanvas());
