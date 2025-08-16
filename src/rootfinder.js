/**
 * @license RootFinder.js v0.0.4 8/16/2025
 * https://raw.org/book/algebra/solving-cubic-equations/
 *
 * Copyright (c) 2025, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 **/

import Complex from 'complex.js';

const RootFinder = {

    "quadratic": function (a, b, c, realOnly = false) {

        const roots = [];
        if (Math.abs(a) < 1e-14) {
            if (Math.abs(b) > 1e-14) {
                // Linear solution
                const x = -c / b;
                if (realOnly) {
                    roots.push(x);
                } else {
                    roots.push(Complex(x));
                }
            }
        } else {
            const D = b * b - 4 * a * c;
            if (Math.abs(D) < 1e-14) {
                const x = -b / (2 * a);
                roots.push(realOnly ? x : Complex(x));
            } else if (D > 0) {
                const sqrtD = Math.sqrt(D);
                const x1 = (-b + sqrtD) / (2 * a);
                const x2 = (-b - sqrtD) / (2 * a);
                if (realOnly) {
                    roots.push(x1, x2);
                } else {
                    roots.push(Complex(x1), Complex(x2));
                }
            } else if (!realOnly) {
                const re = -b / (2 * a);
                const im = Math.sqrt(-D) / (2 * a);
                roots.push(
                    Complex(re, im),
                    Complex(re, -im)
                );
            }
        }
        return roots;
    },

    "cubic": function (a, b, c, d, realOnly = false) {

        if (a === 0) {
            return RootFinder['quadratic'](b, c, d, realOnly);
        }

        if (d === 0) {
            let tmp = RootFinder['quadratic'](a, b, c, realOnly);
            tmp.unshift(realOnly ? 0 : Complex(0));
            return tmp;
        }

        // Normalize coefficients
        const denom = a;
        a = b / denom;
        b = c / denom;
        c = d / denom;

        // Depressed cubic coefficients
        const roots = [];
        const p = b - a * a / 3;
        const q = (2 * a * a * a) / 27 - (a * b) / 3 + c;
        const D = (q / 2) ** 2 + (p / 3) ** 3;

        if (Math.abs(D) < 1e-14) {

            if (Math.abs(q) < 1e-14) {
                // Triple root
                if (realOnly) {
                    roots.push(-a / 3);
                } else {
                    roots.push(Complex(-a / 3));
                }
            } else {
                // One single and one double root
                const u = Math.cbrt(-q / 2);
                const t1 = 2 * u - a / 3;
                const t2 = -u - a / 3;
                if (realOnly) {
                    roots.push(t1, t2);
                } else {
                    roots.push(Complex(t1), Complex(t2));
                }
            }
        } else if (D > 0) {
            // One real root and two complex conjugate roots
            const sqrtD = Math.sqrt(D);
            const u = Math.cbrt(-q / 2 + sqrtD);
            const v = Math.cbrt(-q / 2 - sqrtD);
            const t = u + v;
            const realRoot = t - a / 3;

            if (realOnly) {
                roots.push(realRoot);
            } else {
                // Real root
                roots.push(Complex(realRoot));

                // Complex conjugate roots
                const realPart = -0.5 * (u + v) - a / 3;
                const imaginaryPart = (Math.sqrt(3) / 2) * (u - v);
                roots.push(
                    Complex(realPart, imaginaryPart),
                    Complex(realPart, -imaginaryPart)
                );
            }
        } else {
            // Three real roots
            const r = Math.sqrt(-p / 3);
            const phi = Math.acos(-q / (2 * r ** 3));
            for (let k = 0; k < 3; k++) {
                const angle = (phi + 2 * Math.PI * k) / 3;
                const t = 2 * r * Math.cos(angle);
                const x = t - a / 3;
                if (realOnly) {
                    roots.push(x);
                } else {
                    roots.push(Complex(x));
                }
            }
        }
        return roots;
    }
};
