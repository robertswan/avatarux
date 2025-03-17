//------------------------------------------------------------------------------
function IdleGamestate (modules) {
    const self = this;

    this.id = 'idle';

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.components.gameUi.enable ();
    }

    //------------------------------------------------------------------------------
    this.onExit = () => {
        modules.components.reels.reset ();
        modules.components.gameUi.disable ();
        modules.components.balanceBar.updateWin ();
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        SPIN_CLICKED: {nextState: 'spinRequest'}
    }
}

//------------------------------------------------------------------------------
module.exports = IdleGamestate;
