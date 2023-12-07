import { Player } from "../player/Player";
import { GameState } from "./states/GameState";

export class Game {
    private _state: GameState<Game> | null = null;
    private static instance: Game;
    public player: Player | null = null;
    public canvasContext: CanvasRenderingContext2D;

    constructor() {
        this.canvasContext = (document.getElementById('playField') as HTMLCanvasElement).getContext('2d')!;
        this.addEventListener();
        console.log('canvasContext', this.canvasContext)
    }

    private addEventListener(): void {
        const canvas = document.getElementById('playField') as HTMLCanvasElement;
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            this._state?.onCanvasClick(mouseX, mouseY);
        });
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }

        return Game.instance;
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public transitionTo(state: GameState<Game>): void {
        this._state = state;
        this._state.SetContext(this);
        this._state.onCreate();
    }
}