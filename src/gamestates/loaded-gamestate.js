//------------------------------------------------------------------------------
function LoadedGamestate (modules) {
    this.id = 'loaded';

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.components.postLoadInit ();
        modules.events.push ({id: 'SETUP_SUCCESS'});
    };

    //------------------------------------------------------------------------------
    this.transitions = {
        SETUP_SUCCESS: {nextState: 'idle'}
    };
}

//------------------------------------------------------------------------------
module.exports = LoadedGamestate;
