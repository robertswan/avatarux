//------------------------------------------------------------------------------
function SpinRequestGamestate (modules) {
    const self = this;

    this.id = 'spinRequest';

    //------------------------------------------------------------------------------
    function onSpinResponse (response) {
        modules.session.recordSpinResponse (response);
        // if (response)
    }

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.backend.requestSpin (modules.session.bet, onSpinResponse);
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        // GAME_ROUND_BEGIN: {nextState: 'spinRequest'}
    }
}

//------------------------------------------------------------------------------
module.exports = SpinRequestGamestate;
