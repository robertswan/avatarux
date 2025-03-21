//------------------------------------------------------------------------------
function WinScoringComponent (modules) {
    const self = this;

    const p = {
        winScore:   null,
        totalScore: null,
        strings:    {
            winScore:   '{COUNT} ways with symbol {SYMBOL}\nEach way worth {SINGLE} for {TOTAL}',
            totalScore: 'Total win {TOTAL}'
        }
    };

    //------------------------------------------------------------------------------
    this.showWin = (totalWin, win) => {
        let text = p.strings.winScore;
        text = text.replace ('{COUNT}', win.ways);
        text = text.replace ('{SYMBOL}', win.symbolId);
        text = text.replace ('{SINGLE}', win.grossWinPerWay);
        text = text.replace ('{TOTAL}', win.grossWin);
        p.winScore.text = text;
        p.winScore.visible = true;

        text = p.strings.totalScore;
        text = text.replace ('{TOTAL}', totalWin);
        p.totalScore.text = text;
        p.totalScore.visible = true;
    };

    //------------------------------------------------------------------------------
    this.hide = () => {
        p.winScore.visible = false;
        p.totalScore.visible = false;
    };

    //------------------------------------------------------------------------------
    function construct () {
        const style = new PIXI.TextStyle ({
            fontFamily:      'Arial',
            fill:            '#ffc080',
            stroke:          '#000000',
            strokeThickness: 6,
            lineJoin:        'bevel',
            fontSize:        20,
            align:           'center'
        });

        p.winScore = new PIXI.Text ('', style);
        p.winScore.rotation = 0.3;
        p.winScore.position.set (450, 60);
        p.winScore.anchor.set (0.5);
        modules.components.layout.game.addChild (p.winScore);

        const style2 = new PIXI.TextStyle ({
            fontFamily:      'Arial',
            fill:            '#ffc080',
            stroke:          '#000000',
            strokeThickness: 12,
            lineJoin:        'bevel',
            fontSize:        30,
            align:           'center'
        });

        p.totalScore = new PIXI.Text ('', style2);
        p.totalScore.rotation = 0.3;
        p.totalScore.position.set (120, 350);
        p.totalScore.anchor.set (0.5);
        modules.components.layout.game.addChild (p.totalScore);

        self.hide ();
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = WinScoringComponent;
