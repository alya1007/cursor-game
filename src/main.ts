import './style.css'

import { FigureFactory } from "./domain/figure/FigureFactory";
import { Game } from './domain/game/Game';
import { GameOngoingState } from './domain/game/states/GameOngoingState';

const figureFactory = new FigureFactory();

const playerNameInput = document.getElementById('playerName') as HTMLInputElement;
const startButton = document.getElementById('start') as HTMLButtonElement;

startButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  if (playerName !== '') {
    new Game(playerName, new GameOngoingState());
  } else {
    alert('Please enter a player name.');
  }
});
