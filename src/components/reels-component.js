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
        delayPerCol: 200
    }

    //------------------------------------------------------------------------------
    this.beginSpin = (onComplete) => {
        p.cols.forEach ((col, idx) => {
            const cb = (idx === p.cols.length - 1) ? onComplete : null;
            col.beginSpin (idx * config.delayPerCol, cb);
        });
    }

    //------------------------------------------------------------------------------
    this.endSpin = (slotface, onComplete) => {
        p.cols.forEach ((col, idx) => {
            const cb = (idx === p.cols.length - 1) ? onComplete : null;
            col.endSpin (slotface [idx], idx * config.delayPerCol, cb);
        });
    }

    //------------------------------------------------------------------------------
    this.snapSymbols = (slotface) => {
        p.cols.forEach ((col, idx) => {
            col.snaSymbols (slotface [idx]);
        });
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
