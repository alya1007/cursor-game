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
  public shape: SVGElement | null;
  public color: string | null = null;
  public game: Game;

  constructor(state: FigureState<Figure>, type: FigureType, shape: SVGElement | null) {
    this.type = type;
    this.shape = shape;
    this._state?.setColor();
    this.shape?.setAttribute('fill', this.color!);
    this.transitionTo(state);
    this.game = Game.getInstance();
  }


  public transitionTo(state: FigureState<Figure>): void {
    this.render();
    this._state = state;
    this._state.SetContext(this);
    this._state.setColor();
  }

  public GetState(): FigureState<Figure> {
    return this._state!;
  }

  public render(): void {
    const ctx = (document.getElementById('playField') as HTMLCanvasElement).getContext('2d');

    if (!ctx) {
      console.error('Canvas context not supported');
      return;
    }

    const xCoord = parseFloat(this.shape!.getAttribute('cx') || this.shape!.getAttribute('x') || '0');
    const yCoord = parseFloat(this.shape!.getAttribute('cy') || this.shape!.getAttribute('y') || '0');

    if (this.shape) {
      ctx.fillStyle = this.color || 'black';

      if (this.shape.tagName === 'circle') {
        const radius = parseFloat(this.shape.getAttribute('r') || '0');
        ctx.beginPath();
        ctx.arc(xCoord, yCoord, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'black';
      } else if (this.shape.tagName === 'rect') {
        const width = parseFloat(this.shape.getAttribute('width') || '0');
        const height = parseFloat(this.shape.getAttribute('height') || '0');
        ctx.fillRect(xCoord, yCoord, width, height);
        ctx.strokeRect(xCoord, yCoord, width, height);
        ctx.strokeStyle = 'black';

      }
    }
  }

}