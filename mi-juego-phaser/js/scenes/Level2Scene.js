class Level2Scene extends Phaser.Scene {
  constructor() {
    super('Level2Scene');
  }

  init(data) {
    this.score = data.score || 0;
  }

  create() {
    this.add.image(490, 320, 'background').setDisplaySize(980, 640);

    this.add.image(70, 50, 'level2sign').setScale(0.35);

    this.scoreText = this.add.text(740, 20, 'Puntuació: ' + this.score, {
      fontFamily: 'Grandstander',
      fontStyle: 'bold',
      fontSize: '28px',
      color: '#639ab7'
    });

    //jugador
    this.player = this.physics.add.sprite(100, 200, 'player', 0);
    this.player.setScale(0.2);
    this.player.setCollideWorldBounds(true);

    this.player.body.setSize(150, 400);
    this.player.body.setOffset(360, 250);

    this.cursors = this.input.keyboard.createCursorKeys();

    if (!this.anims.exists('walk')) {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!this.anims.exists('jump')) {
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
    }

    //plataformes
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(80, 380, 'platform2').setScale(0.2, 0.3).refreshBody();
    this.platforms.create(380, 470, 'platform2').setScale(0.2, 0.3).refreshBody();
    this.platforms.create(545, 380, 'platform2').setScale(0.2, 0.3).refreshBody();
    this.platforms.create(760, 280, 'platform2').setScale(0.2, 0.3).refreshBody();
    this.platforms.create(900, 570, 'platform2').setScale(0.2, 0.3).refreshBody();

    //terra
    this.ground = this.physics.add.staticGroup();

    this.ground.create(150, 640, 'floor2').setOrigin(0, 1).setScale(0.22, 0.25).refreshBody();
    this.ground.create(600, 640, 'floor2').setOrigin(0, 1).setScale(0.27, 0.35).refreshBody();
    this.ground.create(500, 640, 'floor2').setOrigin(0, 1).setScale(0.18, 0.22).refreshBody();
    

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.ground);

    //monedes
    this.coins = this.physics.add.group();

    this.coins.create(180, 500, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(352, 370, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(402, 370, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(515, 270, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(565, 270, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(760, 190, 'coin').setScale(0.35, 0.35).refreshBody();
    this.coins.create(760, 420, 'coin').setScale(0.35, 0.35).refreshBody();

    this.coins.children.iterate((coin) => {
      coin.body.allowGravity = false;
      coin.setImmovable(true);
    });

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    this.coinSound = this.sound.add('coinSound', {
      volume: 0.2
    });

    this.tweens.add({
      targets: this.coins.getChildren(),
      y: '-=10',
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    //estrella
    this.hasStar = false;

    this.star = this.physics.add.sprite(900, 490, 'star').setScale(0.14, 0.14).refreshBody();
    this.star.body.allowGravity = false;
    this.star.setImmovable(true);

    this.tweens.add({
      targets: this.star,
      y: '-=10',
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.physics.add.overlap(this.player, this.star, this.collectStar, null, this);
  
    //particules de la estrella
    this.starParticles = this.add.particles(0, 0, 'particle', {
      x: { min: 850, max: 950 },
      y: { min: 430, max: 550 },
      lifespan: 1000,
      speed: { min: 5, max: 20 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.08, end: 0 },
      alpha: { start: 0.5, end: 0 },
      frequency: 80,
      emitting: true
    });

    //cactus
    this.dangers = this.physics.add.group();

    const danger1 = this.dangers.create(250, 527, 'danger').setScale(0.2, 0.2);
    danger1.refreshBody();
    danger1.body.allowGravity = false;
    danger1.setImmovable(true);

    danger1.body.setCircle(120);
    danger1.body.setOffset(20, 10);

    const danger2 = this.dangers.create(300, 522, 'danger').setScale(0.25, 0.25);
    danger2.refreshBody();
    danger2.body.allowGravity = false;
    danger2.setImmovable(true);

    danger2.body.setCircle(125);
    danger2.body.setOffset(20, 10);

    const danger3 = this.dangers.create(630, 487, 'danger').setScale(0.25, 0.25);
    danger3.refreshBody();
    danger3.body.allowGravity = false;
    danger3.setImmovable(true);

    danger3.body.setCircle(120);
    danger3.body.setOffset(20, 10);

    this.physics.add.overlap(this.player, this.dangers, this.hitDanger, null, this);
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);

    this.coinSound.play(); // 👈 sonido aquí

    this.score += 10;
    this.scoreText.setText('Puntuació: ' + this.score);

    this.checkLevelComplete();
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.hasStar = true;

   // 🔊 sonido estrella
    this.sound.play('starSound', { volume: 0.6 });

    if (this.starParticles) {
      this.starParticles.destroy();
    }

    this.checkLevelComplete();
  }

  checkLevelComplete() {
    const noCoinsLeft = this.coins.countActive(true) === 0;

    if (noCoinsLeft && this.hasStar) {
      this.scene.start('GameOverScene', {
        score: this.score,
        message: 'Has guanyat!'
      });
    }
  }

  hitDanger(player, danger) {
    this.scene.start('GameOverScene', {
      score: this.score,
      message: 'Has perdut'
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (!this.player.body.blocked.down) {
      this.player.anims.play('jump', true);
    } else if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.player.anims.play('walk', true);
    } else {
      this.player.anims.stop();
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400);
    }
  }
}