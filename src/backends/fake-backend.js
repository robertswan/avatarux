//------------------------------------------------------------------------------
const MathConfig = require ('./math-config.json');

const Evaluate = require ('./evaluate-wins-any-ways-left-to-right.js');

//------------------------------------------------------------------------------
function FakeBackend (modules) {

    //------------------------------------------------------------------------------
    const p = {
        balance: 10000,
        w: MathConfig.reels.w,
        h: MathConfig.reels.h,
        ways: Math.pow (MathConfig.reels.h, MathConfig.reels.w),
        roundId: Math.floor (Math.random () * 100000000) + 100000000
    };

    const config = {
        simulateServerDelay: 300
    };

    //------------------------------------------------------------------------------
    this.requestOpenGame = (onResponse) => {
        const response = {
            balance: p.balance,
            initialBet: 100,
            bets: [100],

            paytable: MathConfig.paytable,
            reels: MathConfig.reels,
            symbols: MathConfig.symbols,
            ways: p.ways
        };

        setTimeout (() => onResponse (response), config.simulateServerDelay);
    }

    //------------------------------------------------------------------------------
    function initRound (bet) {

        p.balance -= bet;
        p.roundId += Math.floor (Math.random () * 10000);

        if (p.balance < 0) {
            p.balance = 10000 - bet // cycle now to avoid errors. Standard demo behaviour
        }

        return {
            postSpinBalance: p.balance,
            finalBalance: p.balance,
            bet: bet,
            roundId: p.roundId,
            grossWin: 0
        };
    }

    //------------------------------------------------------------------------------
    function randomiseReels () {
        const reels = [];
        for (let i = 0; i < p.w; ++i) {
            const col = [];
            for (let j = 0; j < p.h; ++j) {
                // only allow bonus symbols on reels 0, 2, 4
                if (i % 2 === 0) {
                    col.push (Math.floor (Math.random () * 5));
                } else {
                    col.push (Math.floor (Math.random () * 4) + 1);
                }
            }
            reels.push (col);
        }
        return reels;
    }

    //------------------------------------------------------------------------------
    function evaluateWins (round, reels) {
        const wins = Evaluate (reels);
        return wins;
    }

    //------------------------------------------------------------------------------
    this.requestSpin = (bet, onResponse) => {

        const round = initRound (bet);
        const reels = randomiseReels ();
        const wins = evaluateWins (round, reels);
        const response = {
            round,
            reels,
            wins
        };

        // sort wins and add them
        wins.sort ((a, b) => {return b - a;});
        round.grossWin = wins.reduce ((total, win) => {return total + win.grossWin;}, 0);

        response.round.finalBalance = p.balance += round.grossWin;

        setTimeout (() => onResponse (response), config.simulateServerDelay);
    };
}

//------------------------------------------------------------------------------
module.exports = FakeBackend;
