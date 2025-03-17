//------------------------------------------------------------------------------
function LegalInfoComponent (modules) {
    const self = this;

    const p = {
        roundId: null,
        strings: {
            roundId: 'Round Id: '
        }
    };

    //------------------------------------------------------------------------------
    this.updateRoundId = (value) => {
        p.roundId.text = p.strings.roundId + value;
    };

    //------------------------------------------------------------------------------
    function construct () {
        const style = {
            fontFamily: 'Arial',
            fontSize:   14,
            fill:       0xffffff
        };
        p.roundId = new PIXI.Text ('', style);
        p.roundId.position.set (10, 10);
        modules.components.layout.ui.addChild (p.roundId);

        self.updateRoundId ('');
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = LegalInfoComponent;
