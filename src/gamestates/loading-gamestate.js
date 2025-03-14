//------------------------------------------------------------------------------
function LoadingGamestate (modules) {
    const self = this;

    this.mods = modules;

    //------------------------------------------------------------------------------
    this.onEnter = () => {
        self.mods.res.loadTextures ('textures', () => {
            modules.events.push ({id: 'LOAD_SUCCESS'});
        })
    }

    //------------------------------------------------------------------------------
    this.transitions = {
        LOAD_SUCCESS: {nextState: 'loaded'}
    }
}

//------------------------------------------------------------------------------
module.exports = LoadingGamestate;
