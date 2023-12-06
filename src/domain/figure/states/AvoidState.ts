import { GameOverState } from "../../game/states/GameOverState";
import { Figure } from "../Figure";
import { FigureState } from "./FigureState";

export class AvoidState extends FigureState<Figure> {
    setColor() {
        this.context!.color = 'red';
    }

    addEventListener() {
    }
}