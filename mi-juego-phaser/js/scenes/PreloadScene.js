class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('PreloadScene: preload');

    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(380, 300, 'Carregant...', {
      fontFamily: 'Grandstander',
      fontStyle: 'bold',
      fontSize: '32px',
      color: '#ffffff'
    });

    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('player', 'assets/images/player.png', {
      frameWidth: 857,
      frameHeight: 798
    });
    this.load.spritesheet('jump', 'assets/images/jump.png', {
      frameWidth: 857,
      frameHeight: 798
    });
    this.load.on('filecomplete-image-background', () => {
      console.log('OK: background cargado');
    });

    this.load.on('loaderror', (file) => {
      console.log('ERROR carregant:', file.src);
    });

    //imatges
    this.load.image('platform', 'assets/images/platform.png');

    this.load.image('ground', 'assets/images/floor.png');

    this.load.image('coin', 'assets/images/coin.png');

    this.load.image('star', 'assets/images/star.png');

    this.load.image('danger', 'assets/images/spike.png');

    this.load.image('particle', 'assets/images/particle.png');

    this.load.image('floor2', 'assets/images/floor2.png');

    this.load.image('platform2', 'assets/images/platform2.png');

    this.load.image('level1sign', 'assets/images/level1sign.png');

    this.load.image('level2sign', 'assets/images/level2sign.png');

    this.load.image('titleImage', 'assets/images/title.png');
   
    //música
    this.load.audio('bgMusic', 'assets/audio/musica.mp3');

    this.load.audio('coinSound', 'assets/audio/coin.mp3');

    this.load.audio('starSound', 'assets/audio/star.mp3');
  }

  create() {
    console.log('¿Existe background?', this.textures.exists('background'));
    console.log('¿Existe player?', this.textures.exists('player'));
    this.scene.start('TitleScene');
  }
}