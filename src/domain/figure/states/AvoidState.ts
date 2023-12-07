import { Figure } from "../Figure";
import { FigureState } from "./FigureState";

export class AvoidState extends FigureState<Figure> {
    setColor() {
        this.context!.color = 'red';
    }

    getClicked(mouseX: number, mouseY: number): boolean {
        const clicked = this.context!.shape.tagName === 'rect' ? this.getClickedRectangle(mouseX, mouseY) : this.getClickedCircle(mouseX, mouseY);
        return clicked;
    }

    getClickedRectangle(mouseX: number, mouseY: number) {
        const rectX = this.context!.shapeData.coords.x - (this.context!.shapeData.dimensions.width / 2);
        const rectY = this.context!.shapeData.coords.y - (this.context!.shapeData.dimensions.height / 2);
        if (mouseX > rectX && mouseX < rectX + this.context!.shapeData.dimensions.width && mouseY > rectY && mouseY < rectY + this.context!.shapeData.dimensions.height) {
            console.log('avoidable rectangle clicked')
            return true;
        }
        return false;
    }

    private getClickedCircle(mouseX: number, mouseY: number) {
        const circleX = this.context!.shapeData.coords.x
        const circleY = this.context!.shapeData.coords.y
        const distance = Math.sqrt(((mouseX - circleX) * (mouseX - circleX)) + ((mouseY - circleY) * (mouseY - circleY)));

        if (distance < this.context!.shapeData.dimensions.width / 2) {
            console.log('avoidable circle clicked')
            return true;
        }
        return false;
    }
}