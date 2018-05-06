var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  pixelArt: true,
  /*
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  */
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var map_cells = [];
var graphics;
var game = new Phaser.Game(config);

function preload()
{
  // this.load.setBaseURL('http://lucasw.github.io');
  this.load.setBaseURL('http://localhost:8888');

  // Phaser.Canvas.setSmoothingEnabled(ctx, false);
  this.load.image('grass', 'assets/grass.png');
}

class Thing {
  constructor(x, y, z, sprite) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.sprite = sprite;
  }
}

var cosa = Math.cos(60.0 / 180.0 * Math.PI);
var sina = Math.sin(60.0 / 180.0 * Math.PI);
var redraw_map = true;

// draw hexagon
function makeHex(x, y, wd, do_full=true)
{
  path = new Phaser.Curves.Path(x, y);
  ca = wd * cosa;
  sa = wd * sina;
  x += wd;
  path.lineTo(x, y);
  x += ca;
  y += sa;
  path.lineTo(x, y);
  x -= ca;
  y += sa;
  path.lineTo(x, y);
  if (do_full)
  {
    x -= wd
    path.lineTo(x, y);
    x -= ca;
    y -= sa;
    path.lineTo(x, y);
    x += ca;
    y -= sa;
    path.lineTo(x, y);
  }
  return path;
}

class MapCell
{
  constructor(x, y, z, edge_length, sprite)
  {
    this.x = x;
    this.y = y;
    this.z = z;
    this.edge_length = edge_length;
    this.path = makeHex(x, y, edge_length, true);
    this.sprite = sprite;
    this.sprite.z = z;
    // this.sprite.smoothed = false;
  }

  draw(graphics)
  {
    this.path.draw(graphics);
  }
}

function create()
{
  graphics = this.add.graphics();

  var xs = 60;
  var ys = 60;
  var wd = 32;
  hex_wd = wd * 2.0 * (1.0 + cosa);
  hex_wd_b = wd * (1.0 + cosa);
  hex_ht = wd * (2.0 * sina);

  num_hex = 4;
  lim_xi = Math.ceil(num_hex * 0.6);
  for (xi = 0; xi < lim_xi; xi++)
  {
    for (yi = 0; yi < num_hex; yi++)
    {
      x = xs + xi * hex_wd;
      y = ys + yi * hex_ht;
      grass1 = this.add.sprite(x, y, 'grass');
      // grass1.setScale(hex_wd / grass1.width);
      grass1.smoothed = false;
      grass1.setScale(4.0);
      map_cells.push(new MapCell(x, y, -y * 0.1, wd, grass1));

      x = xs + hex_wd_b + xi * hex_wd;
      y = ys + wd * sina + yi * hex_ht;
      grass2 = this.add.sprite(x, y, 'grass');
      grass2.setScale(hex_wd / grass1.width);
      // grass2.displayWidth = hex_wd;
      map_cells.push(new MapCell(x, y, -y * 0.1, wd, grass2));
    }
  }

  // var line1 = new Phaser.Curves.Line([ 100, 100, 500, 200 ]);
  // var line2 = new Phaser.Curves.Line([ 200, 300, 600, 500 ]);

  // this.add.image(400, 300, 'sky');

  window.onkeydown = function(e)
  {
    // console.log(e.keyCode);
    if (e.keyCode == '87')  // 'w'
    {
    }
    if (e.keyCode == '83')  // 's'
    {
    }
    if (e.keyCode == '65')  // 'a'
    {
    }
    if (e.keyCode == '68')  // 'd'
    {
    }
  };
  window.onkeyup = function(e)
  {
    console.log(e.keyCode);
  };
}

function update()
{
  graphics.clear();
  graphics.lineStyle(2, 0x0a41aa, 1);
  if (redraw_map)
  {
    for (var i = 0; i < map_cells.length; i++)
    {
      map_cells[i].draw(graphics);
    }
    redraw_map = false;
  }
}
