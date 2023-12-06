import { Game } from "../Game";
import { GameState } from "./GameState";

export class GameOverState extends GameState<Game> {
    onCreate(): void {
        console.log('GameOverState: onCreate')
    }
}