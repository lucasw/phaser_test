var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
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

var game = new Phaser.Game(config);

function preload()
{
  // this.load.setBaseURL('http://lucasw.github.io');
  this.load.setBaseURL('http://localhost:8888');

  this.load.image('sky', 'assets/space1.png');
  this.load.image('logo', 'assets/phaser3-logo.png');
  this.load.image('red', 'assets/red.png');

  // Phaser.Canvas.setSmoothingEnabled(ctx, false);
}

var scale_max = 2.0;
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

var scenery = []
var acc_amount = 0.2;
var player;
var focal_length = 15.0;
var focal_cx = 0.0;
var focal_cy = 0.0;

function create()
{
  this.add.image(400, 300, 'sky');

  focal_cx = config.width * 5.5 / 16.0;
  focal_cy = config.height * 0.75 + 14;
  /*
  var particles = this.add.particles('red');
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });
  */

  player = new Thing(0, 0, 0, this.add.sprite(400, 100, 'logo'));
  player.vz = 1.4;
  for (i = 0; i < 20; i++) {
    scenery.push(new Thing(i * 50, 100, 250 + 50 * i, this.add.sprite(400, 100, 'logo')));
  }

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(false);

  // emitter.startFollow(logo);
  window.onkeydown = function(e)
  {
    // console.log(e.keyCode);
    if (e.keyCode == '87')  // 'w'
    {
      player.vy -= acc_amount;
    }
    if (e.keyCode == '83')  // 's'
    {
      player.vy += acc_amount;
    }
    if (e.keyCode == '65')  // 'a'
    {
      player.vx -= acc_amount;
    }
    if (e.keyCode == '68')  // 'd'
    {
      player.vx += acc_amount;
    }
  };
  window.onkeyup = function(e)
  {
    console.log(e.keyCode);
  };
}

function update()
{
  for (i = 0; i < scenery.length; i++) {
    var rz = scenery[i].z - player.z;
    if (rz < 0) {
      scenery[i].sprite.visible = false;
      continue;
    }
    scenery[i].sprite.visible = true;
    var rx = scenery[i].x - player.x;
    var ry = scenery[i].y - player.y;
    scenery[i].sprite.setDepth(1000 - rz);
    var scale = focal_length / rz;
    scenery[i].sprite.setScale(scale);
    var x = scale * rx + focal_cx;
    scenery[i].sprite.x = x
    var y = scale * ry + focal_cy;
    scenery[i].sprite.y = y

    // TODO(lucasw) need to manage ordering of scenery so further stuff
    // is behind nearer stuff.
  }
  player.x += player.vx;
  player.y += player.vy;
  player.z += player.vz;
  player.vx *= 0.95;
  player.vy *= 0.95;

  if (player.z > 2000)
    player.z = 0
}
