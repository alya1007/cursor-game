import { Figure } from "../Figure";
import { FigureState } from "./FigureState";

export class CollectState extends FigureState<Figure> {
    setColor() {
        this.context!.color = 'green';
    }
}