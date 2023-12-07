import { Figure, ShapeData } from "../../figure/Figure";
import { FigureFactory } from "../../figure/FigureFactory";
import { Game } from "../Game";
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
    }


    public onCanvasClick(mouseX: number, mouseY: number): void {
        for (const figure of this.figures) {
            if (figure.shape.tagName === 'rect') {
                if (
                    mouseX >= figure.shapeData.coords.x &&
                    mouseX <= figure.shapeData.coords.x + figure.shapeData.dimensions.width &&
                    mouseY >= figure.shapeData.coords.y &&
                    mouseY <= figure.shapeData.coords.y + figure.shapeData.dimensions.height

                ) {
                    console.log('Clicked on a rectangle figure:', figure);
                    return;
                }
            } else if (figure.shape.tagName === 'circle') {
                const distance = Math.sqrt(
                    Math.pow(mouseX - figure.shapeData.coords.x, 2) + Math.pow(mouseY - figure.shapeData.coords.y, 2)
                );
                if (distance <= figure.shapeData.dimensions.width / 2) {
                    console.log('Clicked on a circle figure:', figure);
                    return;
                }
            }

        }
        console.log('Clicked on empty space.');
    }

    private getClickedRectangle(mouseX: number, mouseY: number, figure: Figure): boolean {
        const rectX = figure.shapeData.coords.x - (figure.shapeData.dimensions.width / 2);
        const rectY = figure.shapeData.coords.y - (figure.shapeData.dimensions.height / 2);
        if (mouseX > rectX && mouseX < rectX + figure.shapeData.dimensions.width && mouseY > rectY && mouseY < rectY + figure.shapeData.dimensions.height) {
            return true;
        }
        return false;
    }

    private getClickedCircle(mouseX: number, mouseY: number, figure: Figure): boolean {
        const circleX = figure.shapeData.coords.x
        const circleY = figure.shapeData.coords.y
        const distance = Math.sqrt(((mouseX - circleX) * (mouseX - circleX)) + ((mouseY - circleY) * (mouseY - circleY)));

        if (distance < figure.shapeData.dimensions.width / 2) {
            return true;
        }
        return false;
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
