export class Player {
    public guid: string;
    public name: string;
    public score: number;

    constructor(name: string) {
        this.guid = crypto.randomUUID();
        this.name = name;
        this.score = 0;
    }

    public increaseScore(points: number): void {
        this.score += points;
    }
}
