import { Game } from "../game/Game";
import { FigureState } from "./states/FigureState";

export enum FigureType {
  Avoid,
  Collect,
  Change,
}

export type ShapeData = {
  coords: { x: number, y: number },
  dimensions: { width: number, height: number },
}

export class Figure {
  private _state: FigureState<Figure> | null = null;
  public type: FigureType;
  public shape: SVGElement;
  public color: string | null = null;
  public shapeData: ShapeData = {
    coords: { x: 0, y: 0 },
    dimensions: { width: 0, height: 0 },
  };

  constructor(state: FigureState<Figure>, type: FigureType, shape: SVGElement) {
    this.type = type;
    this.shape = shape;
    this._state?.setColor();
    this.shape?.setAttribute('fill', this.color!);
    this.transitionTo(state);
    this.shapeData.coords = this.getCoords();
    this.shapeData.dimensions = this.getDimensions();
  }


  public transitionTo(state: FigureState<Figure>): void {
    this._state = state;
    this._state.SetContext(this);
    this._state.setColor();
    this.render();
  }

  public getState(): FigureState<Figure> {
    return this._state!;
  }

  private getCoords(): { x: number, y: number } {
    let xCoord = 0;
    let yCoord = 0;

    if (this.shape.getAttribute('cx')) {
      xCoord = parseFloat(this.shape.getAttribute('cx') || '0');
    } else {
      const xCoordCorner = parseFloat(this.shape.getAttribute('x') || '0');
      xCoord = xCoordCorner + (parseFloat(this.shape.getAttribute('width') || '0') / 2);
    }

    if (this.shape.getAttribute('cy')) {
      yCoord = parseFloat(this.shape.getAttribute('cy') || '0');
    } else {
      const yCoordCorner = parseFloat(this.shape.getAttribute('y') || '0');
      yCoord = yCoordCorner + (parseFloat(this.shape.getAttribute('height') || '0') / 2);
    }

    return { x: xCoord, y: yCoord };
  }

  private getDimensions(): { width: number, height: number } {
    let width = 0;
    let height = 0;

    if (this.shape.getAttribute('r')) {
      width = parseFloat(this.shape.getAttribute('r') || '0') * 2;
      height = parseFloat(this.shape.getAttribute('r') || '0') * 2;
    } else {
      width = parseFloat(this.shape.getAttribute('width') || '0');
      height = parseFloat(this.shape.getAttribute('height') || '0');
    }

    return { width: width, height: height };
  }

  public render(): void {
    const ctx = Game.getInstance().canvasContext;
    if (this.shape) {
      ctx.fillStyle = this.color || 'black';

      if (this.shape.tagName === 'circle') {
        const radius = this.shapeData.dimensions.width / 2;
        ctx.beginPath();
        ctx.arc(this.shapeData.coords.x, this.shapeData.coords.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'black';

      } else if (this.shape.tagName === 'rect') {
        const width = this.shapeData.dimensions.width;
        const height = this.shapeData.dimensions.height;
        ctx.fillRect(this.shapeData.coords.x, this.shapeData.coords.y, width, height);
        ctx.strokeRect(this.shapeData.coords.x, this.shapeData.coords.y, width, height);
        ctx.strokeStyle = 'black';

      }
    }
  }

}