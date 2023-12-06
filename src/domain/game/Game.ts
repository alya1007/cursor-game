import { Player } from "../player/Player";
import { GameState } from "./states/GameState";

export class Game {
    private _state: GameState<Game>;
    public player: Player;

    constructor(name: string, state: GameState<Game>) {
        this.player = new Player(name);
        this._state = state;
        this.transitionTo(state);
        this._state?.onCreate();
    }

    public transitionTo(state: GameState<Game>): void {
        this._state = state;
        this._state.SetContext(this);
        this._state.onCreate();
    }
}