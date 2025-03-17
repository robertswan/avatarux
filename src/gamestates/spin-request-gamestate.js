//------------------------------------------------------------------------------
function SpinRequestGamestate (modules) {
    const self = this;

    this.id = 'spinRequest';

    //------------------------------------------------------------------------------
    function onSpinResponse (response) {
        modules.session.recordSpinResponse (response);
        modules.events.push ({id: ''})
        //
    }

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.backend.requestSpin (modules.session.bet, onSpinResponse);
        // start spin animations
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        // GAME_ROUND_BEGIN: {nextState: 'spinRequest'}
    }
}

//------------------------------------------------------------------------------
module.exports = SpinRequestGamestate;
