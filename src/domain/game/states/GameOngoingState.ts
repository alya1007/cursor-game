import { FigureFactory } from "../../figure/FigureFactory";
import { Game } from "../Game";
import { GameState } from "./GameState";

export class GameOngoingState extends GameState<Game> {
    onCreate(): void {
        console.log('GameOngoingState: onCreate')
        const figuresToCreate = 2;
        const figureFactory = new FigureFactory();
        for (let i = 0; i < figuresToCreate; i++) {
            const avoidableFigure = figureFactory.createAvoidableFigure();
            avoidableFigure.render();

            console.log('avoidableFigure: ', avoidableFigure)

            const collectableFigure = figureFactory.createCollectableFigure();
            collectableFigure.render();

            console.log('collectableFigure: ', collectableFigure)

            const changeableFigure = figureFactory.createChangeableFigure();
            changeableFigure.render();

            console.log('changeableFigure: ', changeableFigure)
        }
    }
}