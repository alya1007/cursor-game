export abstract class FigureState<T> {
    protected context: T | null = null;
    public SetContext(context: T): void {
        this.context = context;
    }

    public setColor(): void { };

    public getClicked(mouseX: number, mouseY: number): boolean {
        return false;
    }
}