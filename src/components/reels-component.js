//------------------------------------------------------------------------------
const ReelColumn = require ('./reel-column-component.js');

//------------------------------------------------------------------------------
function ReelsComponent (modules) {
    const self = this;

    //------------------------------------------------------------------------------
    const p = {
        container: new PIXI.Container (),
        cols: []
    };

    const config = {
        appearDelayPerCol: 100,

        wins: null,
        winFlashDuration: 300,
        winFlashesPerWin: 3,
        winIdx: 0,
        winFlashIdx: 0,
        winInterval: null,
    }

    //------------------------------------------------------------------------------
    this.beginSpin = (onComplete) => {
        p.cols.forEach ((col, idx) => {
            const cb = (idx === p.cols.length - 1) ? onComplete : null;
            col.beginSpin (idx * config.appearDelayPerCol, cb);
        });
    }

    //------------------------------------------------------------------------------
    this.endSpin = (slotface, onComplete) => {
        p.cols.forEach ((col, idx) => {
            const cb = (idx === p.cols.length - 1) ? onComplete : null;
            col.endSpin (slotface [idx], idx * config.appearDelayPerCol, cb);
        });
    }

    //------------------------------------------------------------------------------
    this.snapSymbols = (slotface) => {
        p.cols.forEach ((col, idx) => {
            col.snaSymbols (slotface [idx]);
        });
    }

    //------------------------------------------------------------------------------
    this.flashSymbols = (symbolsUsed) => {
        p.cols.forEach ((col, idx) => {
            col.flashSymbols (symbolsUsed [idx]);
        });
    }

    //------------------------------------------------------------------------------
    this.onWinInterval = () => {
        p.cols.forEach (col => col.reset ());
        ++p.winFlashIdx;
        p.winFlashIdx = (p.winFlashIdx % (config.winFlashesPerWin * 2));
        if (p.winFlashIdx === 0) {
            ++p.winIdx;
            p.winIdx = (p.winIdx % p.wins.length);
        }
        if (p.winFlashIdx % 2 === 1) {
            self.flashSymbols (p.wins [p.winIdx].symbolsUsed);
        }
    }

    //------------------------------------------------------------------------------
    this.cycleWins = (wins) => {
        console.assert (!p.winInterval);

        p.wins = wins;
        p.winIdx = 0;
        p.winFlashIdx = 0;
        self.onWinInterval ();
        p.winInterval = setInterval (self.onWinInterval.bind (self), config. winFlashDuration);
    }

    //------------------------------------------------------------------------------
    this.reset = () => {
        if (p.winInterval) {
            clearInterval (p.winInterval);
            p.winInterval = null;
        }
        p.cols.forEach (col => col.reset ());
    }

    //------------------------------------------------------------------------------
    function construct () {
        modules.pixi.stage.addChild (p.container);
        p.container.position.set (50, 50);
        p.container.scale.set (0.5, 0.5);

        const s = modules.session.openGame;
        for (let i = 0; i < s.reels.w; ++i) {
            console.assert (s.reels.h === s.reels.slotface [i].length);
            p.cols.push (new ReelColumn (modules, i, s.reels.slotface [i], p.container));
        }
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = ReelsComponent;
