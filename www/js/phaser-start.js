game.state.add('init', state_init);
game.state.add('running', state_running);
game.state.add('waiting', state_waiting);
game.state.add('dying', state_dying);
game.state.start('init');
