const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  parent: 'game-container',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      debug: false   // 👈 AQUÍ
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    TitleScene,
    Level1Scene,
    Level2Scene,
    GameOverScene
  ]
};

const game = new Phaser.Game(config);