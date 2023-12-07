import { Figure, ShapeData } from "../../figure/Figure";
import { FigureFactory } from "../../figure/FigureFactory";
import { AvoidState } from "../../figure/states/AvoidState";
import { Game } from "../Game";
import { GameOverState } from "./GameOverState";
import { GameState } from "./GameState";

export class GameOngoingState extends GameState<Game> {
    private readonly WIDTH_MIN: number = 20;
    private readonly WIDTH_MAX: number = 50;
    private readonly HEIGHT_MIN: number = 20;
    private readonly HEIGHT_MAX: number = 30;
    private readonly GRID_COLUMNS: number = 5;
    private readonly GRID_ROWS: number = 3;
    private readonly CELL_WIDTH: number = 180;
    private readonly CELL_HEIGHT: number = 200;

    public figures: Figure[] = [];

    onCreate(): void {
        const shapeDataArray = this.generateShapeData();
        const figureFactory = new FigureFactory();

        for (let i = 0; i < shapeDataArray.length; i += 3) {
            const changeableFigure = figureFactory.createChangeableFigure(shapeDataArray[i]);
            changeableFigure.render();
            this.figures.push(changeableFigure);

            const avoidableFigure = figureFactory.createAvoidableFigure(shapeDataArray[i + 1]);
            avoidableFigure.render();
            this.figures.push(avoidableFigure);

            const collectableFigure = figureFactory.createCollectableFigure(shapeDataArray[i + 2]);
            collectableFigure.render();
            this.figures.push(collectableFigure);
        }

        this.context!.figures = this.figures;
    }


    public onCanvasClick(mouseX: number, mouseY: number): void {
        let figureClicked = null;
        for (const figure of this.figures) {
            if (figure.shape.tagName === 'rect') {
                if (
                    mouseX >= figure.shapeData.coords.x &&
                    mouseX <= figure.shapeData.coords.x + figure.shapeData.dimensions.width &&
                    mouseY >= figure.shapeData.coords.y &&
                    mouseY <= figure.shapeData.coords.y + figure.shapeData.dimensions.height

                ) {
                    figureClicked = figure;
                }
            } else if (figure.shape.tagName === 'circle') {
                const distance = Math.sqrt(
                    Math.pow(mouseX - figure.shapeData.coords.x, 2) + Math.pow(mouseY - figure.shapeData.coords.y, 2)
                );
                if (distance <= figure.shapeData.dimensions.width / 2) {
                    figureClicked = figure;
                }
            }

        }
        const figureState = figureClicked?.getState();
        if (figureState instanceof AvoidState)
            debugger;
        this.context?.transitionTo(new GameOverState(Game.getInstance()));
    }



    private generateShapeData(): ShapeData[] {
        const shapesData: ShapeData[] = [];

        for (let row = 0; row < this.GRID_ROWS; row++) {
            for (let col = 0; col < this.GRID_COLUMNS; col++) {

                const centerX = (col * this.CELL_WIDTH) + (this.getRandomInt(this.WIDTH_MAX / 2, (this.CELL_WIDTH - this.WIDTH_MAX / 2)));
                const centerY = (row * this.CELL_HEIGHT) + (this.getRandomInt(this.HEIGHT_MAX / 2, (this.CELL_HEIGHT - this.HEIGHT_MAX / 2)));

                const randomWidth = this.getRandomInt(this.WIDTH_MIN, this.WIDTH_MAX);
                const randomHeight = this.getRandomInt(this.HEIGHT_MIN, this.HEIGHT_MAX);


                shapesData.push({
                    coords: { x: centerX, y: centerY },
                    dimensions: { width: randomWidth, height: randomHeight },
                });
            }
        }

        return shapesData;
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
