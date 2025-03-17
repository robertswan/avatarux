//------------------------------------------------------------------------------
const MathConfig = require ('./math-config.json');

//------------------------------------------------------------------------------
function getInfo (symbolId) {
    return MathConfig.symbols (symbolId.toString ());
}

//------------------------------------------------------------------------------
function findSymbolWin (symbol, slotface) {
    const allUsed = [];
    let allCombinations = 0;
    let maxLength = 0;
    let canLengthen = true;

    slotface.forEach ((columnface, x) => {
        let combinations = 0;
        let used = [];

        if (canLengthen) {
            columnface.forEach ((symbolId, y) => {
                used.push (symbolId === symbol);
                if (symbolId === symbol) {
                    ++combinations;
                }
            });
            if (combinations === 0) {
                maxLength = x;
                canLengthen = false;
            } else {
                if (maxLength === 0) {
                    allCombinations = combinations;
                } else {
                    allCombinations *= combinations;
                }
                ++maxLength;

            }
        } else {
            used = Array (columnface.length).fill (false);
        }
        allUsed.push (used);
    });

    return {
        symbolId: symbol,
        combinations: allCombinations,
        symbolsUsed: allUsed,
        length: maxLength,
        grossWinPerCombination: 0,
        grossWin: 0
    };
}

//------------------------------------------------------------------------------
// sweep left to right, once for each symbol that has "anyWays" wins
function EvaluateWinsAnyWaysLeftToRight (slotface) {
    const wins = [];

    for (let key in MathConfig.symbols) {
        if (MathConfig.symbols [key].anyWays) {
            const symbolId = parseInt (key);
            const win = findSymbolWin (symbolId, slotface);

            if (win.combinations > 0) {
                const paytable = MathConfig.paytable [key];
                const winPerLine = paytable [win.length - 1]; // no entry in paytable for zero matching
                if (winPerLine > 0) {
                    win.grossWinPerCombination = winPerLine;
                    win.grossWin = winPerLine * win.combinations;
                    wins.push (win);
                }
            }
        }
    }

    return wins;
}

//------------------------------------------------------------------------------
module.exports = EvaluateWinsAnyWaysLeftToRight;
