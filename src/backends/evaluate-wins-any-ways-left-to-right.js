//------------------------------------------------------------------------------
const MathConfig = require ('./math-config.json');

//------------------------------------------------------------------------------
function findSymbolWin (symbol, slotface) {
    const allUsed = [];
    let allWays = 0;
    let maxLength = 0;
    let canWinLonger = true;

    slotface.forEach ((columnface, x) => {
        let ways = 0;
        let used = [];

        if (canWinLonger) {
            // check for more wins on the column
            columnface.forEach ((symbolId, y) => {
                used.push (symbolId === symbol);
                if (symbolId === symbol) {
                    ++ways;
                }
            });

            if (ways === 0) {
                // win broken on this column
                maxLength = x;
                canWinLonger = false;
            } else {
                // win found on this column
                if (maxLength === 0) {
                    allWays = ways;
                } else {
                    allWays *= ways;
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
        ways: allWays,
        symbolsUsed: allUsed,
        length: maxLength,
        grossWinPerWay: 0,
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

            if (win.ways > 0) {
                const paytable = MathConfig.paytable [key];
                const winPerLine = paytable [win.length - 1]; // no entry in paytable for zero matching symbols

                if (winPerLine > 0) {
                    win.grossWinPerWay = winPerLine * bet;
                    win.grossWin = winPerLine * win.ways * bet;
                    wins.push (win);
                }
            }
        }
    }

    return wins;
}

//------------------------------------------------------------------------------
module.exports = EvaluateWinsAnyWaysLeftToRight;
