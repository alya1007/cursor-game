import { Figure } from "../Figure";
import { FigureState } from "./FigureState";

export class AvoidState extends FigureState<Figure> {
    setColor() {
        this.context!.color = 'red';
    }

    addEventListener() {
        const canvas = document.getElementById('playField') as HTMLCanvasElement;
        canvas.addEventListener('click', (event) => {
            console.log('click event')
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            this.context!.shape.tagName === 'circle' ? this.getClickedCircle(mouseX, mouseY) : this.getClickedRectangle(mouseX, mouseY);
        });
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