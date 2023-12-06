import { Player } from "../player/Player";
import { GameOngoingState } from "./states/GameOngoingState";
import { GameState } from "./states/GameState";

export class Game {
    private _state: GameState<Game> | null = null;
    private static instance: Game;
    public player: Player | null = null;

    constructor() {
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