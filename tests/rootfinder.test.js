
const assert = require('assert');
const Complex = require('complex.js');
const RootFinder = require('@rawify/rootfinder');

const solveCubic = RootFinder.cubic;

describe('Quadraitc Equation Solver', function () {

    it('should solve quadratic equations with two complex roots', function () {

        // x^2+2x+5=0

        const roots = solveCubic(0, 1, 2, 5);
        const expectedRoots = [new Complex(-1, -2), new Complex(-1, +2)];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve quadratic equations with two real roots', function () {

        // (x-3)(x+3) = x^2-9 = 0

        const roots = solveCubic(0, 1, 0, -9);
        const expectedRoots = [new Complex(-3, 0), new Complex(3, 0)];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve quadratic equations with one real root', function () {

        // (x-5)^2 = x^2-10x+25=0

        const roots = solveCubic(0, 1, -10, 25);
        const expectedRoots = [new Complex(5, 0)];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

});

describe('Real Cubic Equation Solver', function () {

    it('should solve cubic equation 1 with real results', function () {

        // 32x^3-48x^2+48x-16=0

        const roots = solveCubic(32, -48, 48, -16, true);
        const expectedRoots = [0.5];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => Math.abs(root - expectedRoot) < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equation 2 with real results', function () {

        // 2x^3-6x^2+3x=0

        const roots = solveCubic(2, -6, 3, 0, true);
        const expectedRoots = [0, 0.5 * (3 - Math.sqrt(3)), 0.5 * (3 + Math.sqrt(3))];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => Math.abs(root - expectedRoot) < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equation 3 with real results', function () {

        // 80x^3-120x^2+75x-15=0

        const roots = solveCubic(80, -120, 75, -15, true);
        const expectedRoots = [0.35098209];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => Math.abs(root - expectedRoot) < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equation 4 with real results', function () {

        // 12x^3-18x^2+6x=0

        const roots = solveCubic(12, -18, 6, 0, true);
        const expectedRoots = [0, 1, 0.5];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => Math.abs(root - expectedRoot) < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equation 5 with real results', function () {

        // (x-1)(x-2)(x-3)=x^3-6x^2+11x-6=0

        const roots = solveCubic(1, -6, +11, -6, true);
        const expectedRoots = [1, 2, 3];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => Math.abs(root - expectedRoot) < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

});

describe('Cubic Equation Solver', function () {

    it('should return the right format', function () {

        // x^3+2x^2+3x+4 = x^3 + 2 x^2 + 3 x + 4 = 0

        const roots = solveCubic(1, 2, 3, 4);
        const expectedRoots = [new Complex(-1.6506291914393882), new Complex(-0.17468540428030588, +1.5468688872313963), new Complex(-0.17468540428030588, -1.5468688872313963)];

        assert(Array.isArray(roots), 'Roots should be an array');
        assert.strictEqual(roots.length, expectedRoots.length, 'There should be three roots');
        roots.forEach(root => assert(root instanceof Complex, 'Each root should be an instance of Complex'));

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with three distinct real roots', function () {

        // (x-3)(x-2)(x-1) = x^3 - 6x^2 + 11x - 6 = 0

        const roots = solveCubic(1, -6, 11, -6);
        const expectedRoots = [new Complex(1, 0), new Complex(2, 0), new Complex(3, 0)];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with a triple real root', function () {
        // (x-4)^3 = x^3 - 12 x^2 + 48 x - 64 = 0
        const roots = solveCubic(1, -12, 48, -64);
        const expectedRoot = new Complex(4);

        assert.equal(roots.length, 1, 'Should have only one root');

        roots.forEach((root) => {
            assert(root.sub(expectedRoot).abs() < 1e-5,
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with a triple real root', function () {
        // (x - 2)^3 = x^3 - 6x^2 + 12x - 8 = 0
        const roots = solveCubic(1, -6, 12, -8);
        const expectedRoot = new Complex(2);

        assert.equal(roots.length, 1, 'Should have only one root');

        roots.forEach((root) => {
            assert(root.sub(expectedRoot).abs() < 1e-5,
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with one real root and two complex conjugate roots', function () {

        // (x-(3+4i))(x-(3-4i))(x-7) = x^3 - 13 x^2 + 67 x - 175 = 0

        const roots = solveCubic(1, -13, 67, -175);
        const complexRoot1 = Complex(3, 4);
        const complexRoot2 = complexRoot1.conjugate();

        const expectedRoots = [Complex(7), complexRoot1, complexRoot2];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with one real double root and one distinct real root', function () {
        // (x - 2)^2 * (x - 3) = x^3 - 7x^2 + 16x - 12 = 0
        const roots = solveCubic(1, -7, 16, -12);
        const expectedRoots = [new Complex(2), new Complex(3, 0)];

        assert.equal(roots.length, expectedRoots.length, 'Should have only two roots');

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });

    it('should solve cubic equations with two complex roots', function () {
        // 51x^3+6x^2+87x+12=0
        const roots = solveCubic(51, 6, 87, 12);
        const expectedRoots = [new Complex(-0.13771), new Complex(0.01003, -1.30711), new Complex(0.01003, +1.30711)];

        expectedRoots.forEach((expectedRoot) => {
            assert(roots.some(root => root.sub(expectedRoot).abs() < 1e-5),
                `Expected root ${expectedRoot.toString()} not found`);
        });
    });
});
