//------------------------------------------------------------------------------
const manifest = require ('./resource-manifest.json');

//------------------------------------------------------------------------------
function Resources () {
    const self = this;

    //------------------------------------------------------------------------------
    this.manifest = manifest;
    this.textures = {
        EMPTY: PIXI.Texture.EMPTY,
        WHITE: PIXI.Texture.WHITE
    };

    //------------------------------------------------------------------------------
    function construct () {
        PIXI.Loader.shared.on ('error', (a, b, c, unused_d) => {
            console.log (a.message);
            console.log (c.url);
        });
    }
    construct ();

    //------------------------------------------------------------------------------
    this.getTexture = (resourceName) => {
        console.assert (self.textures [resourceName]);
        return self.textures [resourceName];
    };

    //------------------------------------------------------------------------------
    this.loadTextures = (bundleName, onLoaded) => {
        const requests = this.manifest [bundleName];

        PIXI.Loader.shared.reset ();
        PIXI.Loader.shared.add (requests);
        PIXI.Loader.shared.load (() => {
            const r = PIXI.Loader.shared.resources;
            requests.forEach (request => {
                self.textures [request.name] = r [request.name].texture;
            });
            onLoaded (bundleName);
        });
    };
}

//------------------------------------------------------------------------------
module.exports = Resources;
