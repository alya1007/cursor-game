import { Figure } from "./Figure";
import { AvoidState } from "./states/AvoidState";
import { CollectState } from "./states/CollectState";
import { FigureType } from "./Figure";
import { ShapesFactory } from "./shapes/ShapesFactory";
import { FigureState } from "./states/FigureState";

export class FigureFactory {
  private shapesFactory: ShapesFactory = new ShapesFactory();
  public createAvoidableFigure(): Figure {
    return this.createFigure(new AvoidState(), FigureType.Avoid, this.shapesFactory.CreateCircle());
  }

  public createCollectableFigure(): Figure {
    return this.createFigure(new CollectState(), FigureType.Collect, this.shapesFactory.CreateRectangle());
  }

  public createChangeableFigure(): Figure {
    const figure: Figure = this.createFigure(new AvoidState(), FigureType.Change, this.shapesFactory.CreateSquare());
    this.setupToggleStateTimer(figure);
    return figure;
  }

  private createFigure(state: FigureState<Figure>, type: FigureType, shape: SVGElement): Figure {
    return new Figure(state, type, shape);
  }

  private setupToggleStateTimer(figure: Figure): void {
    const toggleState = () => {
      this.toggleState(figure);
      const interval = this.getRandomInt(500, 3000);
      setTimeout(toggleState, interval);
    };

    setTimeout(toggleState, this.getRandomInt(500, 3000));
  }

  private toggleState(figure: Figure): void {
    if (figure.type === FigureType.Change) {
      figure.transitionTo(figure.GetState().constructor === AvoidState ? new CollectState() : new AvoidState());
    }
  }


  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}