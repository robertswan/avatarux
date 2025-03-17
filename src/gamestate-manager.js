//------------------------------------------------------------------------------
const Idle = require ('./gamestates/idle-gamestate.js');
const Handshake = require ('./gamestates/handshake-gamestate.js');
const Loading = require ('./gamestates/loading-gamestate.js');
const Loaded = require ('./gamestates/loaded-gamestate.js');
const ShowBaseWins = require ('./gamestates/show-base-wins-gamestate.js');
const SpinRequest = require ('./gamestates/spin-request-gamestate.js');
const SpinResolve = require ('./gamestates/spin-resolve-gamestate.js');

//------------------------------------------------------------------------------
function GamestateManager (modules) {
    const self = this;

    this.states = {};
    this.currentState = null;

    //------------------------------------------------------------------------------
    function construct () {
        const states = [
            new Idle (modules),
            new Handshake (modules),
            new Loading (modules),
            new Loaded (modules),
            new SpinRequest (modules),
            new SpinResolve (modules),
            new ShowBaseWins (modules)
        ];

        states.forEach (state => {
            console.assert (typeof state.id === 'string');
            console.assert (!(state.id in self.states));
            self.states [state.id] = state;
        });
    }
    construct ();

    //------------------------------------------------------------------------------
    this.tick = () => {
        while (modules.events.hasPending ()) {
            const e = modules.events.pop ();
            console.assert (typeof e.id === 'string');
            const t = self.currentState.transitions;
            if (t && t [e.id]) {
                console.assert (t && t [e.id] && typeof t [e.id].nextState === 'string');
                self.changeState (t [e.id].nextState);
            } else {
                console.warn ('transition event ignored', e.id);
            }
        }

        if (self.currentState && self.currentState.onTick) {
            self.currentState.onTick ();
        }
    };

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
    };
}

//------------------------------------------------------------------------------
module.exports = GamestateManager;
