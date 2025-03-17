//------------------------------------------------------------------------------
const mathConfig = require ('./math-config.json');

//------------------------------------------------------------------------------
function FakeBackend (modules) {

    //------------------------------------------------------------------------------
    const p = {
        balance: 10000,
        w: mathConfig.reels.w,
        h: mathConfig.reels.h,
        ways: Math.pow (mathConfig.reels.h, mathConfig.reels.w),
        roundId: Math.floor (Math.random () * 100000000) + 100000000
    }

    //------------------------------------------------------------------------------
    this.requestOpenGame = (onResponse) => {
        const response = {
            balance: p.balance,
            initialBet: 100,
            bets: [100],

            paytable: mathConfig.paytable,
            reels: mathConfig.reels,
            symbols: mathConfig.symbols,
            ways: p.ways
        };

        setTimeout (() => onResponse (response), 1000);
    }

    //------------------------------------------------------------------------------
    function initRound (bet) {

        p.balance -= bet;
        p.roundId += Math.floor (Math.random () * 1000);

        if (p.balance < 0) {
            p.balance = 10000 - bet // cycle now to avoid errors. Standard demo behaviour
        }

        return {
            postSpinBalance: p.balance,
            finalBalance: p.balance,
            bet: bet,
            roundId: p.roundId
        };
    }

    //------------------------------------------------------------------------------
    function spinReels () {
        const reels = [];
        for (let i = 0; i < p.x; ++i) {
            const col = [];
            for (let j = 0; j < p.y; ++j) {
                col.push (Math.floor (Math.random () * 5) + 1);
            }
            reels.push (col);
        }
        return reels;
    }

    //------------------------------------------------------------------------------
    function evaluateWins (round, reels) {
    }

    //------------------------------------------------------------------------------
    this.requestSpin = (bet, onResponse) => {

        const round = initRound (bet);
        const reels = spinReels ();
        const wins = evaluateWins (round, reels);
        const response = {
            round,
            reels,
            wins
        };

        setTimeout (() => onResponse (response), 1000);
    };
}

//------------------------------------------------------------------------------
module.exports = FakeBackend;
