//------------------------------------------------------------------------------
const Loading = require ('./gamestates/loading-gamestate.js');
const Loaded = require ('./gamestates/loaded-gamestate.js');

//------------------------------------------------------------------------------
function GamestateManager (modules) {
    const self = this;

    this.states = {};
    this.currentState = null;

    //------------------------------------------------------------------------------
    function construct () {
        self.states.loading = new Loading (modules);
        self.states.loaded = new Loaded (modules);
        // this.states.idle = new Idle ();
        // this.states.spinRequest = new SpinRequest ();
    }
    construct ();

    //------------------------------------------------------------------------------
    this.tick = () => {
        while (modules.events.hasPending ()) {
            const e = modules.events.pop ();
            console.assert (typeof e.id === 'string');
            const t = self.currentState.transitions;
            console.assert (t && t [e.id] && typeof t [e.id].nextState === 'string');
            self.changeState (t [e.id].nextState);
        }

        if (self.currentState && self.currentState.onTick) {
            self.currentState.onTick ();
        }
    }

    //------------------------------------------------------------------------------
    this.changeState = (stateName) => {
        console.assert (self.states [stateName]);

        console.log ('change state', stateName);

        if (self.currentState && self.currentState.onExit) {
            self.currentState.onExit ();
        }

        self.currentState = self.states [stateName];

        if (self.currentState && self.currentState.onEnter) {
            self.currentState.onEnter ();
        }
    }
}

//------------------------------------------------------------------------------
module.exports = GamestateManager;
