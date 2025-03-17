//------------------------------------------------------------------------------
function BalanceBarComponent (modules) {
    const self = this;

    const p = {
        balance: null,
        win:     null,
        bet:     null,

        strings: {
            balance: 'Balance: ',
            win:     'Win: ',
            bet:     'Bet: '
        }
    };

    //------------------------------------------------------------------------------
    this.updateBalance = (value) => {
        p.balance.text = p.strings.balance + value;
    };

    //------------------------------------------------------------------------------
    this.updateWin = (value) => {
        if (typeof value === 'number') {
            p.win.visible = true;
            p.win.text = p.strings.win + value;
        } else {
            p.win.visible = false;
        }
    };

    //------------------------------------------------------------------------------
    this.updateBet = (value) => {
        p.bet.text = p.strings.bet + value;
    };

    //------------------------------------------------------------------------------
    function construct () {
        const style = {
            fontFamily: 'Arial',
            fontSize:   20,
            fill:       0xffffff
        };
        p.balance = new PIXI.Text ('', style);
        p.win = new PIXI.Text ('', style);
        p.bet = new PIXI.Text ('', style);

        p.balance.position.set (10, 490);
        p.balance.anchor.set (0, 1.0);

        p.win.position.set (300, 490);
        p.win.anchor.set (0.5, 1.0);

        p.bet.position.set (590, 490);
        p.bet.anchor.set (1.0, 1.0);

        modules.components.layout.ui.addChild (p.balance, p.win, p.bet);

        self.updateBalance (modules.session.balance);
        self.updateWin ();
        self.updateBet (modules.session.bet);
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = BalanceBarComponent;
