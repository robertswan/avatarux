//------------------------------------------------------------------------------
function BalanceBarComponent (modules) {
    const self = this;

    const p = {
        balance: null,
        win: null,
        bet: null,

        strings: {
            balance: 'Balance: ',
            win: 'Win: ',
            bet: 'Bet: ',
        }
    };

    //------------------------------------------------------------------------------
    this.updateBalance = (value) => {
        p.balance.text = p.strings.balance + value;
    }

    //------------------------------------------------------------------------------
    this.updateWin = (value) => {
        p.win.text = p.strings.win + value;
    }

    //------------------------------------------------------------------------------
    this.updateBet = (value) => {
        p.bet.text = p.strings.bet + value;
    }

    //------------------------------------------------------------------------------
    function construct () {
        const style = {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff
        };
        p.balance = new PIXI.Text (p.strings.balance, style);
        p.win = new PIXI.Text (p.strings.win, style);
        p.bet = new PIXI.Text (p.strings.bet, style);

        p.balance.position.set (50, 500);
        p.win.position.set (250, 500);
        p.bet.position.set (450, 500);

        modules.pixi.stage.addChild (p.balance, p.win, p.bet);
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = BalanceBarComponent;
