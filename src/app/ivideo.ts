export interface Ivideo {
    play(): void;
    pause(): void;
    seek(position: number): void;
    mute(is_muted: boolean): void;
    getTotalDuration(): number;
}
