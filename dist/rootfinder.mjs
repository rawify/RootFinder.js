'use strict';
import Complex from 'complex.js';



const omega = Complex(-0.5, Math.sqrt(3) / 2); // Cube root of unity

const RootFinder = {

    "quadratic": (a, b, c) => {

        let D = b * b - 4 * a * c;

        let aa = 2 * a;
        let mb = -b;

        if (D > 0) {
            let sqrt = Math.sqrt(D);
            return [
                Complex({ "re": (mb + sqrt) / aa, "im": 0 }),
                Complex({ "re": (mb - sqrt) / aa, "im": 0 })
            ];
        } else if (D < 0) {
            let sqrt = Math.sqrt(-D);
            return [
                Complex({ "re": mb / aa, "im": sqrt / aa }),
                Complex({ "re": mb / aa, "im": - sqrt / aa })
            ];
        } else {
            return [
                Complex({ "re": mb / aa, "im": 0 })
            ];
        }
    },

    "cubic": (a, b, c, d) => {

        if (a === 0) {
            return RootFinder['quadratic'](b, c, d);
        }

        if (d === 0) {
            return [Complex(0), ...RootFinder['quadratic'](a, b, c)];
        }

        b = b / a;
        c = c / a;
        d = d / a;

        const delta0 = Complex(b * b - 3 * c, 1e-16);
        const delta1 = Complex(2 * b * b * b - 9 * b * c + 27 * d, 1e-16);

        const discriminant = Complex(delta1['re'] * delta1['re'] - 4 * delta0['re'] * delta0['re'] * delta0['re']);

        const C = delta1['add'](discriminant['sqrt']())['div'](2)['pow'](1 / 3);

        return [
            C['add'](delta0['div'](C))['neg']()['div'](3)['sub'](b / 3),
            C['mul'](omega)['add'](delta0['div'](C['mul'](omega)))['neg']()['div'](3)['sub'](b / 3),
            C['mul'](omega['conjugate']())['add'](delta0['div'](C['mul'](omega['conjugate']())))['neg']()['div'](3)['sub'](b / 3)
        ];

        /*
        // Cardano’s Method

        // Make a depressed cubic of the form x^3 + px + q = 0
        let p = (3 * a * c - b * b) / (3 * a * a);
        let q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

        // Calculate cube roots of complex numbers
        let D = Complex(Math.pow(q / 2, 2) + Math.pow(p / 3, 3));
        let sqrtD = D.sqrt();
        let u = Complex(-q / 2).add(sqrtD).pow(1 / 3);
        let v = Complex(-q / 2).sub(sqrtD).pow(1 / 3);

        // Calculate the roots in t
        let t1 = u.add(v);
        let t2 = v.mul(omega.conjugate()).add(u.mul(omega));
        let t3 = u.mul(omega.conjugate()).add(v.mul(omega));

        // Transform back to the original variable x
        let shift = -b / (3 * a);
        return [t1.add(shift), t2.add(shift), t3.add(shift)];*/
    }

};
export {
  RootFinder as default, RootFinder
};
