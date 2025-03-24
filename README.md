# RootFinder.js

[![NPM Package](https://img.shields.io/npm/v/rootfinder.svg?style=flat)](https://npmjs.org/package/rootfinder "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

**RootFinder.js** is a lightweight JavaScript library for finding the roots of [quadratic equations](https://raw.org/book/algebra/solving-quadratic-equations/) and [cubic equations](https://raw.org/book/algebra/solving-cubic-equations/). It leverages the **[Complex.js](https://github.com/rawify/Complex.js)** library to handle complex solutions, ensuring precision and correctness when dealing with both real and complex numbers.

## Features

- Solve **quadratic** equations of the form `ax² + bx + c = 0`.
- Solve **cubic** equations of the form `ax³ + bx² + cx + d = 0` using Cardano's method.
- Support for **complex roots** using `Complex.js`.

## Installation

You can install `RootFinder.js` via npm:

```bash
npm install rootfinder
```

## Usage

Import the library into your JavaScript or Node.js project:

```javascript
const RootFinder = require('rootfinder');
```

or 

```javascript
import RootFinder from 'rootfinder';
```

### Solving Quadratic Equations

To find the roots of a quadratic equation `ax² + bx + c = 0`:

```javascript
const roots = RootFinder.quadratic(1, -3, 2);
console.log(roots); // Output: [ Complex { re: 2 }, Complex { re: 1 } ]
```

If the equation has complex roots:

```javascript
const complexRoots = RootFinder.quadratic(1, 0, 1);
console.log(complexRoots); // Output: [ Complex { re: 0, im: 1 }, Complex { re: 0, im: -1 } ]
```

### Solving Cubic Equations

To find the roots of a cubic equation `ax³ + bx² + cx + d = 0`:

```javascript
const roots = RootFinder.cubic(1, -6, 11, -6);
console.log(roots); // Output: [ Complex { re: 1 }, Complex { re: 2 }, Complex { re: 3 } ]
```

For cubic equations with complex roots:

```javascript
const complexRoots = RootFinder.cubic(1, 0, 0, -1);
console.log(complexRoots); // Output: [ Complex { re: 1, im: 0 }, Complex { re: -0.5, im: 0.866 }, Complex { re: -0.5, im: -0.866 } ]
```

## API

### `quadratic(a, b, c[, returnReal=false])`

Solves the quadratic equation `ax² + bx + c = 0`.

- **Parameters**:
  - `a` (Number): Coefficient of `x²`
  - `b` (Number): Coefficient of `x`
  - `c` (Number): Constant term
  - `returnReal` (optional Boolean): Decide if only real roots should be returned

- **Returns**: An array of roots, which can contain real or complex numbers.

### `cubic(a, b, c, d[, returnReal=false])`

Solves the cubic equation `ax³ + bx² + cx + d = 0` using Cardano's method.

- **Parameters**:
  - `a` (Number): Coefficient of `x³`
  - `b` (Number): Coefficient of `x²`
  - `c` (Number): Coefficient of `x`
  - `d` (Number): Constant term
  - `returnReal` (optional Boolean): Decide if only real roots should be returned

- **Returns**: An array of roots, which can contain real or complex numbers.


## Coding Style

As every library I publish, RootFinder.js is also built to be as small as possible after compressing it with Google Closure Compiler in advanced mode. Thus the coding style orientates a little on maxing-out the compression rate. Please make sure you keep this style if you plan to extend the library.

## Building the library

After cloning the Git repository run:

```
npm install
npm run build
```

## Run a test

Testing the source against the shipped test suite is as easy as

```
npm run test
```

## Copyright and Licensing

Copyright (c) 2025, [Robert Eisele](https://raw.org/)
Licensed under the MIT license.
