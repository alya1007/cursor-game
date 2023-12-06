export abstract class FigureState<T> {
    protected context: T | null = null;
    public SetContext(context: T): void {
        this.context = context;
    }

    public setColor(): void { };
}