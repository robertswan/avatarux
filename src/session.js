//------------------------------------------------------------------------------
function Session (modules) {
    const self = this;

    this.balance = 0;
    this.bet = 0;

    this.openGame = null;
    this.spin = null;

    //------------------------------------------------------------------------------
    this.recordOpenGame = (response) => {
        this.openGame = response;
        this.balance = response.balance;
        this.bet = response.initialBet;
    }

    //------------------------------------------------------------------------------
    this.recordSpinResponse = (response) => {
        this.spin = response;
        this.balance = response.round.postSpinBalance;
        modules.components.balanceBar.refresh ();
    }

    //------------------------------------------------------------------------------
    this.finaliseSpinResponse = () => {
        this.balance = p.spin.round.finalBalance;
        modules.components.balanceBar.refresh ();
    }
}

//------------------------------------------------------------------------------
module.exports = Session;