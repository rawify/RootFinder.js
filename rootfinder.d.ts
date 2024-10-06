
declare module 'RootFinder';

import Complex from 'complex.js';

declare class RootFinder {
    static quadratic(a: number, b: number, c: number): Complex[];
    static cubic(a: number, b: number, c: number, d: number): Complex[];
}

export { RootFinder as default };