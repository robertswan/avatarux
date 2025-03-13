//------------------------------------------------------------------------------
window.PIXI = require ("pixi.js");

const Resources = require ('./src/resources.js');

const manifest = require ('./src/resource-manifest.json');

//------------------------------------------------------------------------------
function initPixi (onTick) {
    const canvas = document.getElementById ('canvas');

    PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

    const rendererOptions = {
        width:             window.innerWidth,
        height:            window.innerHeight,
        resolution:        window.devicePixelRatio,
        clearBeforeRender: false,
        autoResize:        false,
        transparent:       false,
        roundPixels:       false,
        view:              window.document.getElementById ('canvas')
    };

    PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;
    PIXI.utils.skipHello ();

    const renderer = new PIXI.Application (rendererOptions);
    renderer.view.style.position = "fixed";

    renderer.ticker.add (() => {onTick ();});

    return renderer;
}

//------------------------------------------------------------------------------
function loadResources (manifest) {
    const resources = new Resources (manifest);
    resources.loadBundle ('textures');
    return resources;
}

//------------------------------------------------------------------------------
function initModules (manifest, onTick) {

    const modules = {
        pixi: null,
        res: null
    };

    modules.pixi = initPixi (onTick);
    modules.res = new loadResources (manifest);

    return modules;
}

//------------------------------------------------------------------------------
function onTick () {
    console.log ('tick');
}

//------------------------------------------------------------------------------
window.swan.game = {
    run: function (pageConfig) {
        const modules = initModules (manifest, onTick);

        const text = new PIXI.Text ('hello world', {
            fontFamily: 'Arial',
            fontSize: 100,
            fill: 0xffffff
        });
        text.position.set (100, 100);
        modules.pixi.stage.addChild (text);
    }
}

