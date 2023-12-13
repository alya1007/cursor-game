import { Figure } from "../figure/Figure";
import { Player } from "../player/Player";
import { GameState } from "./states/GameState";

export class Game {
    private _state: GameState<Game> | null = null;
    public figures: Figure[] = [];
    public timerIds: number[] = [];
    private static instance: Game;
    public player: Player | null = null;
    public canvasContext: CanvasRenderingContext2D;
    public gameInterval: number = 0;
    public timerDisplay: HTMLElement | null = document.getElementById('timeDisplay');

    constructor() {
        const canvas = document.getElementById('playField') as HTMLCanvasElement;
        this.canvasContext = (document.getElementById('playField') as HTMLCanvasElement).getContext('2d')!;
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        this.addEventListener();
        console.log('canvasContext', this.canvasContext);

    }

    private displayTimer() {
        if (this.timerDisplay) {
            this.timerDisplay.textContent = `Timer: ${this.gameInterval}`;
        }
    }


    public startTimer() {
        this.gameInterval = 0;
        this.updateTimer();
    }

    private updateTimer() {
        this.gameInterval += 1;
        this.displayTimer();
        this.timerIds.push(window.setTimeout(() => {
            this.updateTimer();
        }, 1000));
    }

    public stopTimer() {
        this.timerIds.forEach((timerId) => {
            clearTimeout(timerId);
        });
        this.timerIds = [];
        this.gameInterval = 0;
        this.displayTimer();
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