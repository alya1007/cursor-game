import './style.css'

import { Game } from './domain/game/Game';
import { Player } from './domain/player/Player';
import { GameOngoingState } from './domain/game/states/GameOngoingState';


const playerNameInput = document.getElementById('playerName') as HTMLInputElement;
const startButton = document.getElementById('start') as HTMLButtonElement;

const playerInstance = Player.getInstance();

const openingCard = document.getElementsByClassName('card')[0] as HTMLDivElement;

const playField = document.getElementsByClassName('play')[0] as HTMLDivElement;

startButton.addEventListener('click', () => {
  // const playerName = playerNameInput?.value?.trim();
  openingCard.style.display = 'none';
  playField.style.display = 'flex';
  // playerInstance.setName(playerName);
  // if (playerName !== '') {
  const game = new Game();
  game.setPlayer(playerInstance);
  game.transitionTo(new GameOngoingState(Game.getInstance()));
  // } else {
  //   alert('Please enter a player name.');
  // }
});
