import { Game } from "../Game";
import { GameState } from "./GameState";

export class GameOverState extends GameState<Game> {
    onCreate(): void {
        this.context?.canvasContext.clearRect(0, 0, 900, 600);
    }
    public onCanvasClick(mouseX: number, mouseY: number): void {

    }
}