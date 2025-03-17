//------------------------------------------------------------------------------
function Session (modules) {
    const self = this;

    this.balance = 0;
    this.bet = 0;

    this.openGame = null;
    this.spin = null;

    //------------------------------------------------------------------------------
    this.recordOpenGame = (response) => {
        self.openGame = response;
        self.balance = response.balance;
        self.bet = response.initialBet;
    };

    //------------------------------------------------------------------------------
    this.recordSpinResponse = (response) => {
        self.spin = response;
        self.balance = response.round.postSpinBalance;
        modules.components.balanceBar.updateBalance (self.balance);
        modules.components.legalInfo.updateRoundId (response.round.roundId);
    };

    //------------------------------------------------------------------------------
    this.finaliseSpinResponse = () => {
        self.balance = self.spin.round.finalBalance;
        modules.components.balanceBar.updateBalance (self.balance);
    };
}

//------------------------------------------------------------------------------
module.exports = Session;
