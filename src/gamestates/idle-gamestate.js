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
        modules.components.gameUi.disable ();
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        SPIN_CLICKED: {nextState: 'spinRequest'}
    }
}

//------------------------------------------------------------------------------
module.exports = IdleGamestate;
