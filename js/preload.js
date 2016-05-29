var game = new Phaser.Game("100", "100", Phaser.AUTO);

constants = {
  tileSize: 64,
  gravityStepUp: -0.5,
  gravityStepDown: -0.08,
  hspeed: -2.5,
  jumpStrength: -12
};
objects = {};
colorPalette = {
  accent: '#22CC77',
  light: '#ddd',
  middle: '#888',
  dark: '#333'
};
