export abstract class GameState<T> {
    protected context: T;

    constructor(context: T) {
        this.context = context;
    }

    public SetContext(context: T): void {
        this.context = context;
    }

    public abstract onCreate(): void;

    public onCanvasClick(mouseX: number, mouseY: number): void { };
}