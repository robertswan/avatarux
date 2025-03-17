//------------------------------------------------------------------------------
function SpinRequestGamestate (modules) {
    const self = this;

    this.id = 'spinRequest';

    //------------------------------------------------------------------------------
    const p = {
        waitFor: 0
    };

    //------------------------------------------------------------------------------
    function checkComplete () {
        --p.waitFor;
        if (p.waitFor === 0) {
            modules.events.push ({id: 'REQUEST_COMPLETE'});
        }
    }

    //------------------------------------------------------------------------------
    function onReelsAnimComplete () {
        checkComplete ();
    }

    //------------------------------------------------------------------------------
    function onSpinResponse (response) {
        modules.session.recordSpinResponse (response);
        console.log (response);
        checkComplete ();
    }

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        p.waitFor = 2;
        modules.components.reels.beginSpin (onReelsAnimComplete);
        modules.backend.requestSpin (modules.session.bet, onSpinResponse);
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        REQUEST_COMPLETE: {nextState: 'spinResolve'}
    }
}

//------------------------------------------------------------------------------
module.exports = SpinRequestGamestate;
