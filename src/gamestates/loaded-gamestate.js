//------------------------------------------------------------------------------
function LoadedGamestate (modules) {
    const self = this;

    this.mods = modules;

    //------------------------------------------------------------------------------
    this.onEnter = () => {

        const t = self.mods.res.getTexture ('symbol9');
        const s = new PIXI.Sprite (t);
        s.position.set (100, 100);
        self.mods.pixi.stage.addChild (s);
    }
}

//------------------------------------------------------------------------------
module.exports = LoadedGamestate;
