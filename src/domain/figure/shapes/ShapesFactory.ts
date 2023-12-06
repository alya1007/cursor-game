export class ShapesFactory {
    public CreateCircle(): SVGElement {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.getRandomInt(50, 950).toString());
        circle.setAttribute("cy", this.getRandomInt(50, 550).toString());
        circle.setAttribute("r", this.getRandomInt(15, 35).toString());
        circle.setAttribute("stroke", "black");

        return circle;
    }

    public CreateRectangle(): SVGElement {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", this.getRandomInt(50, 950).toString());
        rect.setAttribute("y", this.getRandomInt(50, 550).toString());
        rect.setAttribute("width", this.getRandomInt(15, 50).toString());
        rect.setAttribute("height", this.getRandomInt(15, 50).toString());
        rect.setAttribute("stroke", "black");

        return rect;
    }

    public CreateSquare(): SVGElement {
        const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const length = this.getRandomInt(15, 50).toString();
        square.setAttribute("x", this.getRandomInt(50, 950).toString());
        square.setAttribute("y", this.getRandomInt(50, 550).toString());
        square.setAttribute("width", length);
        square.setAttribute("height", length);
        square.setAttribute("stroke", "black");

        return square;
    }

    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}