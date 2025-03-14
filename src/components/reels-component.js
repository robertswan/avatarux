//------------------------------------------------------------------------------
const ReelColumn = require ('./reel-column-component.js');

//------------------------------------------------------------------------------
function ReelsComponent (modules) {
    const self = this;

    //------------------------------------------------------------------------------
    const p = {
        cols: []
    };

    //------------------------------------------------------------------------------
    function construct () {
        const s = modules.session.openGame;
        for (let i = 0; i < s.reels.w; ++i) {
            console.assert (s.reels.h === s.reels.slotface [i].length);
            p.cols.push (new ReelColumn (modules, s.reels.h, s.reels.slotface [i]));
        }

    }
    construct ();

    //------------------------------------------------------------------------------
    function setSymbols (slotface, isSnap, onComplete) {

        p.cols.forEach ((col, idx) => {
            // only call callback on last columns animation complete
            const cb = (idx === p.cols.length - 1) ? onComplete : null;
            col.setSymbols (slotface [idx], isSnap, cb);
        });
    }
}

//------------------------------------------------------------------------------
module.exports = ReelsComponent;
