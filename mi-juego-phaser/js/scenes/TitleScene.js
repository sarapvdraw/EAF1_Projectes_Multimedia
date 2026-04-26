class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    console.log('TitleScene: existe background =', this.textures.exists('background'));

    this.cameras.main.setBackgroundColor('#87CEEB');

    if (this.textures.exists('background')) {
      this.add.image(490, 320, 'background').setDisplaySize(980, 640);
    } else {
      this.add.rectangle(480, 320, 960, 640, 0xff0000);
    }

    this.add.text(480, 250, "Bolet's Adventure", {
      fontFamily: 'Grandstander',
      fontSize: '80px',
      color: '#ed6c76',
      fontStyle: 'bold'
      
    }).setOrigin(0.5);

    this.add.text(480, 320, 'Clica ESPAI per començar', {
      fontFamily: 'Grandstander',
      fontStyle: 'bold',
      fontSize: '28px',
      color: '#ed9b91'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('Level1Scene', { score: 0 });
    });

    this.tweens.add({
      targets: this.add.image(680, 450, 'star').setScale(0.2),
      y: '-=10',
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.tweens.add({
      targets: this.add.image(450, 550, 'titleImage').setScale(0.27),
      y: '-=10',
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    //Música
    if (!this.sound.get('bgMusic')) {
     const music = this.sound.add('bgMusic', {
        volume: 0.1,
        loop: true
      });
      music.play();
    }
  }
}