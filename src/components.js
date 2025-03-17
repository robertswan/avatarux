//------------------------------------------------------------------------------
const BalanceBar = require ('./components/balance-bar-component.js');
const GameUi = require ('./components/game-ui-component.js');
const Layout = require ('./components/layout-component.js');
const LegalInfo = require ('./components/legal-info-component.js');
const Reels = require ('./components/reels-component.js');

//------------------------------------------------------------------------------
function Components (modules) {
    const self = this;

    //------------------------------------------------------------------------------
    this.balanceBar = null;
    this.gameUi = null;
    this.layout = null;
    this.legalInfo = null;
    this.reels = null;

    //------------------------------------------------------------------------------
    this.postLoadInit = () => {
        // must be instantiated first so visual components can use the layout
        self.layout = new Layout (modules);

        self.balanceBar = new BalanceBar (modules);
        self.gameUi = new GameUi (modules);
        self.legalInfo = new LegalInfo (modules);
        self.reels = new Reels (modules);
    }
}

//------------------------------------------------------------------------------
module.exports = Components;
