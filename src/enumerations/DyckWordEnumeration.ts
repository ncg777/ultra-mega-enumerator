import { Enumeration } from '../interfaces/Enumeration';
import { hashCodeFor } from 'utils/utils';

class State {
    private readonly parent: State | null;
    public readonly word: string;
    public readonly index: number;

    // Main constructor
    private constructor(word: string, index: number, parent: State | null = null) {
        this.parent = parent;
        this.word = word;
        this.index = index;
    }

    public static create(word: string, index: number): State {
        return new State(word, index);
    }

    public static createWithParent(parent: State, word: string, index: number): State {
        return new State(word, index, parent);
    }

    public update(index: number): State {
        return new State(this.word, index, this.parent);
    }

    public push(word: string, index: number): State {
        return new State(word, index, this);
    }

    public pop(): State | null {
        return this.parent;
    }

    public equals(o: any): boolean {
        if (this === o) return true;
        if (o == null || this.constructor !== o.constructor) return false;

        const state = o as State;

        return this.index === state.index &&
            (this.parent ? this.parent.equals(state.parent) : state.parent == null) &&
            this.word === state.word;
    }

    public hashCode(): number {
        let result = this.parent ? this.parent.hashCode() : 0;
        result = 31 * result + (this.word ? hashCodeFor(this.word) : 0);
        result = 31 * result + this.index;
        return result;
    }

    public toString(): string {
        return this.parent !== null ?
            `State{word='${this.word}', index=${this.index}, parent=${this.parent}}` :
            `State{word='${this.word}', index=${this.index}}`;
    }
}

/**
 * Adapted into an Enumeration from code by nl.dvberkel.
 */
export class DyckWordEnumeration implements Enumeration<string> {
    private currentState: State | null;
    private readonly symbols = ["(", ")"];
    private readonly target = this.symbols[1] + this.symbols[0];
    private readonly replacement = this.symbols[0] + this.symbols[1];

    public constructor(nbOfPairs: number) {
        this.currentState = this.initialStateOfLength(nbOfPairs * 2);
    }

    private next(state: State): State | null {
      
        do {
            if (state.index < state.word.length) {
                let j = state.index;
                while (j < (state.word.length - 1) && state.word.substring(j, j + 2) !== this.target) {
                    j++;
                }
                if (j < (state.word.length - 1)) {
                    const word = state.word;
                    const nextWord = word.substring(0, j) + this.replacement + word.substring(j + 2);
                    return state.update(j + 2).push(nextWord, j - 1);
                }
            }
            state = state.pop()!;
        } while (state !== null);
        return null;
    }

    private initialStateOfLength(n: number): State {
        return State.create(this.initialWordOfLength(n), 0);
    }

    private initialWordOfLength(n: number): string {
        let builder = '';
        for (let index = 0; index < n; index++) {
            builder += this.symbols[index % 2];
        }
        return builder;
    }

    public hasMoreElements(): boolean {
        return this.currentState != null;
    }

    public nextElement(): string {
        if (this.currentState == null) {
            throw new Error("No such element");
        }
        const o = this.currentState.word;
        this.currentState = this.next(this.currentState);
        return o;
    }
}

