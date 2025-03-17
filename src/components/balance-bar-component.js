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
        if (typeof value === 'number') {
            p.win.visible = true;
            p.win.text = p.strings.win + value;
        } else {
            p.win.visible = false;
        }
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
        p.balance = new PIXI.Text ('', style);
        p.win = new PIXI.Text ('', style);
        p.bet = new PIXI.Text ('', style);

        p.balance.position.set (50, 500);
        p.win.position.set (250, 500);
        p.bet.position.set (450, 500);

        modules.pixi.stage.addChild (p.balance, p.win, p.bet);

        self.updateBalance (modules.session.balance);
        self.updateWin ();
        self.updateBet (modules.session.bet);
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = BalanceBarComponent;
