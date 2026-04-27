class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.message = data.message || 'Game Over';
  }

  create() {
    this.cameras.main.setBackgroundColor('#d1ebfb');

    let colorTexto;

    //cartells de vistòria i derrota
    if (this.message === 'Has perdut') {
      colorTexto = '#d94d52'; 
    } else if (this.message === 'Has guanyat!') {
      colorTexto = '#fbbd3f'; 
    } else {
      colorTexto = '#ffffff';
    }

    this.add.text(480, 270, this.message, {
      fontFamily: 'Grandstander',
      fontSize: '100px',
      color: colorTexto,
     fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 360, `Puntuació total: ${this.finalScore}`, {
      fontFamily: 'Grandstander',
      fontStyle: 'bold',
      fontSize: '38px',
      color: '#639ab7'
    }).setOrigin(0.5);

    //text per reiniciar
    this.add.text(480, 420, 'Clica R per reiniciar', {
      fontFamily: 'Grandstander',
      fontStyle: 'bold',
      fontSize: '24px',
      color: '#faf9f5'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-R', () => {
      this.scene.start('TitleScene');
    });
  }
}