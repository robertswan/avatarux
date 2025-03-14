//------------------------------------------------------------------------------
const BalanceBar = require ('./components/balance-bar-component.js');
const Reels = require ('./components/reels-component.js');
const GameUi = require ('./components/game-ui-component.js');

//------------------------------------------------------------------------------
function Components (modules) {
    const self = this;

    //------------------------------------------------------------------------------
    this.balanceBar = null;
    this.reels = null;
    this.gameUi = null;

    //------------------------------------------------------------------------------
    this.postLoadInit = () => {
        self.balanceBar = new BalanceBar (modules);
        self.reels = new Reels (modules);
        self.gameUi = new GameUi (modules);
    }
}

//------------------------------------------------------------------------------
module.exports = Components;
