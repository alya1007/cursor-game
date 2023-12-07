import './style.css'

import { Game } from './domain/game/Game';
import { Player } from './domain/player/Player';
import { GameOngoingState } from './domain/game/states/GameOngoingState';


const playerNameInput = document.getElementById('playerName') as HTMLInputElement;
const startButton = document.getElementById('start') as HTMLButtonElement;

const playerInstance = Player.getInstance();

startButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  playerInstance.setName(playerName);
  if (playerName !== '') {
    const game = new Game();
    game.setPlayer(playerInstance);
    game.transitionTo(new GameOngoingState(Game.getInstance()));
  } else {
    alert('Please enter a player name.');
  }
});
