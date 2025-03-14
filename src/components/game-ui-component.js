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
        const spin = new PIXI.Sprite (modules.resources.getTexture ('symbol9'));
        spin.position.set (100, 100);
        spin.on ("pointertap", onSpinClicked);
        modules.pixi.stage.addChild (spin);

        p.spin = spin;

        self.disable ();
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = GameUiComponent;
