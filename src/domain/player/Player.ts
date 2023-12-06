export class Player {
    public guid: string;
    public name: string;
    public score: number;
    private static instance: Player;

    constructor() {
        this.guid = crypto.randomUUID();
        this.name = this.guid;
        this.score = 0;
    }

    public increaseScore(points: number): void {
        this.score += points;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public static getInstance(): Player {
        if (!Player.instance) {
            Player.instance = new Player();
        }

        return Player.instance;
    }
}
