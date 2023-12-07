import { Figure, ShapeData } from "./Figure";
import { AvoidState } from "./states/AvoidState";
import { CollectState } from "./states/CollectState";
import { FigureType } from "./Figure";
import { ShapesFactory } from "./shapes/ShapesFactory";
import { FigureState } from "./states/FigureState";

export class FigureFactory {
  private shapesFactory: ShapesFactory = new ShapesFactory();
  public createAvoidableFigure(shapeData: ShapeData): Figure {
    return this.createFigure(new AvoidState(), FigureType.Avoid, this.shapesFactory.createCircle(shapeData));
  }

  public createCollectableFigure(shapeData: ShapeData): Figure {
    return this.createFigure(new CollectState(), FigureType.Collect, this.shapesFactory.createRectangle(shapeData));
  }

  public createChangeableFigure(shapeData: ShapeData) {
    const figure: Figure = this.createFigure(new AvoidState(), FigureType.Change, this.shapesFactory.createSquare(shapeData));
    const timerId = this.setupToggleStateTimer(figure);
    return {
      figure,
      timerId,
    };
  }

  private createFigure(state: FigureState<Figure>, type: FigureType, shape: SVGElement): Figure {
    return new Figure(state, type, shape);
  }

  private setupToggleStateTimer(figure: Figure) {
    return setInterval(() => this.toggleState(figure), this.getRandomInt(500, 3000));
  }

  private toggleState(figure: Figure) {
    if (figure.type === FigureType.Change) {
      figure.transitionTo(figure.getState().constructor === AvoidState ? new CollectState() : new AvoidState());
    }
  }


  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}