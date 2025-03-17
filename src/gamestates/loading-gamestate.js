//------------------------------------------------------------------------------
function LoadingGamestate (modules) {
    this.id = 'loading';

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        modules.resources.loadTextures ('textures', () => {
            modules.events.push ({id: 'LOAD_SUCCESS'});
        });
    };

    //------------------------------------------------------------------------------
    this.transitions = {
        LOAD_SUCCESS: {nextState: 'handshake'}
    };
}

//------------------------------------------------------------------------------
module.exports = LoadingGamestate;
