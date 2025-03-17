//------------------------------------------------------------------------------
function HandshakeGamestate (modules) {
    this.id = 'handshake';

    //------------------------------------------------------------------------------
    function onRequestResponse (response) {
        console.log (response);
        modules.session.recordOpenGame (response);
        modules.events.push ({id: 'RESPONSE_SUCCESS'});
    }

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.backend.requestOpenGame (onRequestResponse);
    };

    //------------------------------------------------------------------------------
    this.transitions = {
        RESPONSE_SUCCESS: {nextState: 'loaded'}
    };
}

//------------------------------------------------------------------------------
module.exports = HandshakeGamestate;
