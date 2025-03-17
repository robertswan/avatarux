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
    let canWinLonger = true;

    slotface.forEach ((columnface, x) => {
        let combinations = 0;
        let used = [];

        if (canWinLonger) {
            // check for more wins on the column
            columnface.forEach ((symbolId, y) => {
                used.push (symbolId === symbol);
                if (symbolId === symbol) {
                    ++combinations;
                }
            });

            if (combinations === 0) {
                // win broken on this column
                maxLength = x;
                canWinLonger = false;
            } else {
                // win found on this column
                if (maxLength === 0) {
                    allCombinations = combinations;
                } else {
                    allCombinations *= combinations;
                }
                ++maxLength;

            }
        } else {
            // no checks needed - win conditions already broken by previous column
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
function EvaluateWinsAnyWaysLeftToRight (bet, slotface) {
    const wins = [];

    for (let key in MathConfig.symbols) {

        // sweep left to right, once for each symbol that has "anyWays" wins set in the config
        if (MathConfig.symbols [key].anyWays) {
            const symbolId = parseInt (key);
            const win = findSymbolWin (symbolId, slotface);

            if (win.combinations > 0) {
                const paytable = MathConfig.paytable [key];
                const winPerLine = paytable [win.length - 1]; // no entry in paytable for zero matching symbols

                if (winPerLine > 0) {
                    win.grossWinPerCombination = winPerLine * bet;
                    win.grossWin = winPerLine * win.combinations * bet;
                    wins.push (win);
                }
            }
        }
    }

    return wins;
}

//------------------------------------------------------------------------------
module.exports = EvaluateWinsAnyWaysLeftToRight;
