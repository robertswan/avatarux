//------------------------------------------------------------------------------
function SpinResolveGamestate (modules) {
    const self = this;

    this.id = 'spinResolve';

    //------------------------------------------------------------------------------
    function onReelsAnimComplete () {
        const response = modules.session.spin;
        const id = (response.wins && response.wins.length > 0) ? 'SPIN_WITH_WINS' : 'SPIN_NO_WINS';
        modules.events.push ({id: id});
    }

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.components.reels.endSpin (modules.session.spin.reels, onReelsAnimComplete);
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        SPIN_WITH_WINS: {nextState: 'showWins'},
        SPIN_NO_WINS: {nextState: 'idle'},
    }
}

//------------------------------------------------------------------------------
module.exports = SpinResolveGamestate;
