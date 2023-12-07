import { Game } from "../Game";
import { GameState } from "./GameState";

export class GameOverState extends GameState<Game> {
    onCreate(): void {
        for (const figure of this.context.figures) {
            figure.shape.remove();
        }

        for (const timerId of this.context.timerIds) {
            clearInterval(timerId);
        }
        this.context.figures = [];
        this.context.timerIds = [];

        this.context?.canvasContext.clearRect(0, 0, 1100, 700);

        console.log('figures: ', this.context.figures)
        console.log('timerIds: ', this.context.timerIds)

    }
    public onCanvasClick(mouseX: number, mouseY: number): void {

    }
}