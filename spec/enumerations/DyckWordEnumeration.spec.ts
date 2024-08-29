import { DyckWordEnumeration } from '../../src/enumerations/DyckWordEnumeration';

describe('DyckWordEnumeration', () => {
    it('should return empty string for n=0', () => {
        const enumeration = new DyckWordEnumeration(0);
        expect(enumeration.nextElement()).toEqual("");
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should return [1] for n=1', () => {
        const enumeration = new DyckWordEnumeration(1);
        expect(enumeration.nextElement()).toEqual("()");
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate Dyck words for n=2', () => {
        const enumeration = new DyckWordEnumeration(2);

        const expectedResults = [
            "()()",
            "(())"
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
    it('should correctly enumerate Dyck words for n=3', () => {
        const enumeration = new DyckWordEnumeration(3);

        const expectedResults = [            
            "()()()",
            "(())()",
            "(()())",
            "((()))",
            "()(())",
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });

    it('should correctly enumerate Dyck words for n=4', () => {
        const enumeration = new DyckWordEnumeration(4);

        const expectedResults = [            
            "()()()()",
            "(())()()",
            "(()())()",
            "((()))()",
            "((())())",
            "((()()))",
            "(((())))",
            "(()()())",
            "(()(()))",
            "(())(())",
            "()(())()",
            "()(()())",
            "()((()))",
            "()()(())",
        ];

        for (const expected of expectedResults) {
            const result = enumeration.nextElement();
            expect(result).toEqual(expected);
        }
        expect(enumeration.hasMoreElements()).toEqual(false);
    });
});

