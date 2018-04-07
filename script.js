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

var scale_max = 2.0
var logo_scale = 0.05
var scenery = []
var scenery_dist = []
var vel = 2.4

function create()
{
  this.add.image(400, 300, 'sky');

  var particles = this.add.particles('red');

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  scenery.push(this.physics.add.image(400, 100, 'logo'));
  scenery_dist.push(100);
  emitter.startFollow(scenery[0])
  scenery.push(this.physics.add.image(400, 100, 'logo'));
  scenery_dist.push(120);
  scenery.push(this.physics.add.image(400, 100, 'logo'));
  scenery_dist.push(140);

  // logo.setVelocity(100, 200);
  // logo.setBounce(1, 1);
  // logo.setCollideWorldBounds(false);

  // emitter.startFollow(logo);
}

function update()
{
  for (i = 0; i < scenery.length; i++) {
    dist = scenery_dist[i];
    scale = 15.0 / dist;
    scenery[i].setScale(scale);
    scenery_dist[i] -= vel;
    if (scenery_dist[i] < 0) {
      scenery_dist[i] = 200
    }
  }
}
