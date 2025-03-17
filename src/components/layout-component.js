//------------------------------------------------------------------------------
function LayoutComponent (modules) {
    const self = this;

    this.ui = new PIXI.Container ();
    this.game = new PIXI.Container ();

    //------------------------------------------------------------------------------
    const p = {
        parent: new PIXI.Container ()
    };

    //------------------------------------------------------------------------------
    const config = {
        contentW: 600,
        contentH: 500
    };

    //------------------------------------------------------------------------------
    self.resize = (w, h) => {
        const scaleX = w / config.contentW;
        const scaleY = h / config.contentH;
        const scale = (scaleX < scaleY) ? scaleX : scaleY;

        p.parent.scale.set (scale);
        p.parent.position.set ((w - config.contentW * scale) * 0.5, (h - config.contentH * scale) * 0.5);
    };

    //------------------------------------------------------------------------------
    function construct () {
        modules.pixi.stage.addChild (p.parent);
        p.parent.addChild (self.game);
        p.parent.addChild (self.ui);

        self.resize (modules.resizer.w, modules.resizer.h);
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = LayoutComponent;
