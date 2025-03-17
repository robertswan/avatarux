//------------------------------------------------------------------------------
function ShowBaseWinsGamestate (modules) {
    const self = this;

    this.id = 'showBaseWins';

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.session.finaliseSpinResponse ();
        modules.components.balanceBar.updateWin (modules.session.spin.round.grossWin);
        modules.components.reels.cycleWins (modules.session.spin.wins);
        modules.events.push ({id: 'CYCLE_STARTED'});
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        CYCLE_STARTED: {nextState: 'idle'}
    }
}

//------------------------------------------------------------------------------
module.exports = ShowBaseWinsGamestate;
