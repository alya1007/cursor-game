import { ShapeData } from "../../figure/Figure";
import { FigureFactory } from "../../figure/FigureFactory";
import { Game } from "../Game";
import { GameState } from "./GameState";

export class GameOngoingState extends GameState<Game> {
    private readonly WIDTH_MIN: number = 10;
    private readonly WIDTH_MAX: number = 50;
    private readonly HEIGHT_MIN: number = 10;
    private readonly HEIGHT_MAX: number = 30;
    private readonly GRID_COLUMNS: number = 5;
    private readonly GRID_ROWS: number = 3;
    private readonly CELL_WIDTH: number = 180;
    private readonly CELL_HEIGHT: number = 200;

    onCreate(): void {
        console.log('GameOngoingState: onCreate');
        const shapeDataArray = this.generateShapeData();
        console.log('shapeDataArray: ', shapeDataArray);

        const figureFactory = new FigureFactory();

        for (let i = 0; i < shapeDataArray.length; i++) {
            const collectableFigure = figureFactory.createChangeableFigure(shapeDataArray[i]);
            collectableFigure.render();
            console.log('collectableFigure: ', collectableFigure);
        }
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
