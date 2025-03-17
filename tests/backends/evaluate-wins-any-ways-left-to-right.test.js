//------------------------------------------------------------------------------
const EvaluateWins = require ('../../src/backends/evaluate-wins-any-ways-left-to-right.js');

//------------------------------------------------------------------------------
const defaultBet = 100;

//------------------------------------------------------------------------------
const slotfaces5x3 = {
    noWins: [
        [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[1, 1, 1], [2, 2, 2], [2, 2, 2], [2, 2, 2], [2, 2, 2]],
        [[1, 1, 1], [1, 1, 1], [2, 3, 4], [3, 4, 5], [0, 1, 2]],
        [[1, 1, 1], [1, 1, 1], [2, 2, 2], [1, 1, 1], [1, 1, 1]],
        [[0, 1, 2], [3, 4, 5], [0, 1, 2], [3, 4, 5], [0, 1, 2]]
    ],

    fakeNonLeftToRightWins: [
        [[1, 1, 1], [2, 2, 2], [2, 2, 2], [2, 2, 2], [1, 1, 1]],
        [[1, 1, 1], [2, 2, 2], [2, 2, 2], [2, 2, 2], [2, 2, 2]]
    ],

    singleWins: [
        {expectedWays: 1, slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
        {expectedWays: 1, slotface: [[2, 1, 2], [3, 1, 3], [2, 1, 2], [2, 1, 2], [2, 2, 2]]},
        {expectedWays: 1, slotface: [[2, 2, 1], [3, 3, 1], [2, 2, 1], [2, 2, 2], [2, 2, 2]]},
        {expectedWays: 1, slotface: [[2, 2, 1], [1, 3, 3], [2, 1, 2], [2, 2, 1], [1, 2, 2]]},
        {expectedWays: 2, slotface: [[1, 2, 1], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
        {expectedWays: 2, slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [2, 1, 1], [1, 2, 2]]},
        {expectedWays: 3, slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [2, 1, 2], [1, 1, 1]]},
        {expectedWays: 4, slotface: [[1, 2, 2], [1, 3, 1], [1, 2, 2], [2, 1, 1], [1, 2, 2]]},
        {expectedWays: 24, slotface: [[1, 2, 1], [1, 1, 1], [1, 1, 2], [2, 1, 1], [1, 2, 2]]},
        {expectedWays: 243, slotface: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]},
    ],

    multipleWins: [
        {expected: [{symbolId: 1, ways: 1}, {symbolId: 2, ways: 1}], slotface: [[1, 2, 3], [1, 4, 2], [1, 2, 3], [1, 2, 3], [1, 3, 3]]},
        {expected: [{symbolId: 1, ways: 4}, {symbolId: 2, ways: 3}], slotface: [[1, 2, 3], [1, 1, 2], [1, 2, 3], [1, 2, 1], [2, 2, 2]]},
    ],

    winsWithGrossAmount: [
        {bet: 100, expected: [{grossWin: 1000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [2, 2, 2], [2, 2, 2]]},
        {bet: 100, expected: [{grossWin: 2000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [2, 2, 2]]},
        {bet: 100, expected: [{grossWin: 4000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
        {bet: 200, expected: [{grossWin: 2000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [2, 2, 2], [2, 2, 2]]},
        {bet: 200, expected: [{grossWin: 4000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [2, 2, 2]]},
        {bet: 200, expected: [{grossWin: 8000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
        {bet: 1, expected: [{grossWin: 40}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
        {bet: 1000, expected: [{grossWin: 40000}], slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [1, 2, 2], [1, 2, 2]]},
    ],

    winsWithFullOutput: [
        {
            bet: 100,
            slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 2], [2, 2, 2], [2, 2, 2]],
            expected: [{
                symbolId: 1,
                ways: 1,
                symbolsUsed: [[true, false, false], [true, false, false], [true, false, false], [false, false, false], [false, false, false]],
                length: 3,
                grossWinPerWay: 10 * 100,
                grossWin: 10 * 100
            }]
        },{
            bet: 25,
            slotface: [[1, 2, 2], [1, 3, 3], [1, 2, 1], [2, 1, 2], [2, 2, 2]],
            expected: [{
                symbolId: 1,
                ways: 2,
                symbolsUsed: [[true, false, false], [true, false, false], [true, false, true], [false, true, false], [false, false, false]],
                length: 4,
                grossWinPerWay: 20 * 25,
                grossWin: 20 * 25 * 2
            }]
        },{
            bet: 25,
            slotface: [[1, 2, 2], [1, 3, 2], [1, 2, 1], [2, 1, 2], [2, 2, 2]],
            expected: [{
                symbolId: 1,
                ways: 2,
                symbolsUsed: [[true, false, false], [true, false, false], [true, false, true], [false, true, false], [false, false, false]],
                length: 4,
                grossWinPerWay: 20 * 25,
                grossWin: 20 * 25 * 2
            },{
                symbolId: 2,
                ways: 12,
                symbolsUsed: [[false, true, true], [false, false, true], [false, true, false], [true, false, true], [true, true, true]],
                length: 5,
                grossWinPerWay: 20 * 25,
                grossWin: 20 * 25 * 12
            }]
        }
    ]
};

//------------------------------------------------------------------------------
describe('evaluate wins any ways left to right module', () => {

    //------------------------------------------------------------------------------
    test ('no win slotface are identified', () => {
        slotfaces5x3.noWins.forEach (input => {
            const output = EvaluateWins (defaultBet, input);
            expect (output).toHaveLength (0);
        });
    });

    //------------------------------------------------------------------------------
    test ('wins not starting at left column are ignored', () => {
        slotfaces5x3.fakeNonLeftToRightWins.forEach (input => {
            const output = EvaluateWins (defaultBet, input);
            expect (output).toHaveLength (0);
        });
    });

    //------------------------------------------------------------------------------
    test ('single win ways are correctly calculated', () => {
        slotfaces5x3.singleWins.forEach (input => {
            const output = EvaluateWins (defaultBet, input.slotface);
            expect (output).toHaveLength (1);
            expect (output [0].ways).toBe (input.expectedWays);
        });
    });

    //------------------------------------------------------------------------------
    test ('multiple win ways are correctly calculated', () => {
        slotfaces5x3.multipleWins.forEach (input => {
            const output = EvaluateWins (defaultBet, input.slotface);
            expect (output).toMatchObject (input.expected);
        });
    });

    //------------------------------------------------------------------------------
    test ('gross wins are correctly calculated', () => {
        slotfaces5x3.winsWithGrossAmount.forEach (input => {
            const output = EvaluateWins (input.bet, input.slotface);
            expect (output).toMatchObject (input.expected);
        });
    });

    //------------------------------------------------------------------------------
    test ('all win properties are correctly calculated', () => {
        slotfaces5x3.winsWithFullOutput.forEach (input => {
            const output = EvaluateWins (input.bet, input.slotface);
            expect (output).toMatchObject (input.expected);
        });
    });
});