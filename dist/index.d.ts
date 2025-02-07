// Generated by dts-bundle-generator v9.5.1

export type Cell = boolean;
export declare enum Status {
	Alive = "\uD83D\uDFE9",
	Dead = "\u2B1B"
}
export type Board = Cell[][];
export interface Options {
	width?: number;
	height?: number;
	board?: Board;
	ms?: number;
	showGeneration?: boolean;
}
export declare class GameOfLife {
	private board;
	private intervalId?;
	private generation;
	width: number;
	height: number;
	constructor(options?: Options);
	/**
	 * Generate the next generation of the board.
	 */
	next(): void;
	/**
	 * Get the current generation number.
	 */
	getGeneration(): number;
	/**
	 * Get the current board.
	 */
	getBoard(): Board;
	/**
	 * Start the game loop. Default interval is 100ms.
	 */
	start(ms?: number): void;
	/**
	 * Stop the game loop.
	 */
	stop(): void;
	/**
	 * Display the current board.
	 */
	display(): void;
	private updateBoard;
	private updateCell;
}

export {};
