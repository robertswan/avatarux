//------------------------------------------------------------------------------
function GameUiComponent (modules) {
    const self = this;

    //------------------------------------------------------------------------------
    const p = {
        spin: null
    };

    //------------------------------------------------------------------------------
    this.enable = () => {
        p.spin.interactive = true;
        p.spin.visible = true;
    }

    //------------------------------------------------------------------------------
    this.disable = () => {
        p.spin.interactive = false;
        p.spin.visible = false;
    }

    //------------------------------------------------------------------------------
    function onSpinClicked () {
        modules.events.push ({id: 'SPIN_CLICKED'});
    }

    //------------------------------------------------------------------------------
    function construct () {

        const style = {
            fontFamily: 'Arial',
            fontSize: 30,
            fill: 0x000000
        };
        const text = new PIXI.Text ('SPIN', style);
        text.anchor.set (0.5, 0.5);

        const spin = new PIXI.Graphics ();
        spin.beginFill (0xa0f0a0, 1);
        spin.drawCircle (0, 0, 50);
        spin.endFill ();

        spin.position.set (300, 410);
        spin.on ("pointertap", onSpinClicked);
        spin.addChild (text);
        modules.components.layout.game.addChild (spin);

        p.spin = spin;

        self.disable ();
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = GameUiComponent;
