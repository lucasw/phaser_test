var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload()
{
  this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');

  // Phaser.Canvas.setSmoothingEnabled(ctx, false);
}

var scale_max = 2.0;
class Thing {
  constructor(x, y, z, image) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.image = image;
  }
}

var scenery = []
var vel = 2.4;
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

  scenery.push(new Thing(250, 100, 150, this.physics.add.image(400, 100, 'logo')));
  scenery.push(new Thing(0, 100, 140, this.physics.add.image(400, 100, 'logo')));
  scenery.push(new Thing(-500, 100, 110, this.physics.add.image(400, 100, 'logo')));
  scenery.push(new Thing(500, 100, 100, this.physics.add.image(400, 100, 'logo')));

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(false);

  // emitter.startFollow(logo);
}

function update()
{
  for (i = 0; i < scenery.length; i++) {
    var scale = focal_length / scenery[i].z;
    var x = scale * scenery[i].x + focal_cx;
    scenery[i].image.x = x
    var y = scale * scenery[i].y + focal_cy;
    scenery[i].image.y = y
    scenery[i].image.setScale(scale);

    scenery[i].z -= vel;
    // TODO(lucasw) need to manage ordering of scenery so further stuff
    // is behind nearer stuff.
    if (scenery[i].z < 0) {
      scenery[i].z = 200
    }
  }
}
