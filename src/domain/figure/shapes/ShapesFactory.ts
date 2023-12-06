import { ShapeData } from "../Figure";

export class ShapesFactory {

    public createCircle(shapeData: ShapeData): SVGElement {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", shapeData.coords.x.toString());
        circle.setAttribute("cy", shapeData.coords.y.toString());
        circle.setAttribute("r", (shapeData.dimensions.width / 2).toString());

        return circle;
    }

    public createRectangle(shapeData: ShapeData): SVGElement {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", (shapeData.coords.x - (shapeData.dimensions.width / 2)).toString());
        rect.setAttribute("y", (shapeData.coords.y - (shapeData.dimensions.height / 2)).toString());
        rect.setAttribute("width", shapeData.dimensions.width.toString());
        rect.setAttribute("height", shapeData.dimensions.height.toString());

        return rect;
    }

    public createSquare(shapeData: ShapeData): SVGElement {
        const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        square.setAttribute("x", (shapeData.coords.x - (shapeData.dimensions.width / 2)).toString());
        square.setAttribute("y", (shapeData.coords.y - (shapeData.dimensions.width / 2)).toString());
        square.setAttribute("width", shapeData.dimensions.width.toString());
        square.setAttribute("height", shapeData.dimensions.width.toString());
        square.setAttribute("stroke", "black");

        return square;
    }
}