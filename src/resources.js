//------------------------------------------------------------------------------
function Resources (manifest) {
    const self = this;

    this.manifest = manifest;

    //------------------------------------------------------------------------------
    function construct () {
        // PIXI.settings.RETINA_PREFIX = /x([0-9]+)-res/;
        // prepareAllGroupRequests (resourcesConfig.json);

        // PIXI.Loader.shared.on ("progress", loader => {GameLoadProgress.reportProgess (p.currentGroupId, loader.progress);});
        // PIXI.Loader.shared.on ("error", (a, b, c, unused_d) => {
        //     console.log (a.message);
        //     console.log (c.url);
        //     p.downloadsOk = false;
        //     p.onGroupLoaded (false);
        // });
    }
    construct ();

    //------------------------------------------------------------------------------
    this.loadBundle = function (bundleName) {

    }
}

//------------------------------------------------------------------------------
module.exports = Resources;
