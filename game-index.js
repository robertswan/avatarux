//------------------------------------------------------------------------------
window.PIXI = require ("pixi.js");

const Components = require ('./src/components.js');
const Events = require ('./src/events.js');
const FakeBackend = require ('./src/backends/fake-backend.js');
const Gamestates = require ('./src/gamestate-manager.js');
const Resources = require ('./src/resources.js');
const Session = require ('./src/session.js');

//------------------------------------------------------------------------------
function initPixi (onTick, payload) {
    const canvas = document.getElementById ('canvas');

    PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

    const rendererOptions = {
        width:             window.innerWidth,
        height:            window.innerHeight,
        resolution:        window.devicePixelRatio,
        clearBeforeRender: true,
        autoResize:        false,
        transparent:       false,
        roundPixels:       false,
        view:              window.document.getElementById ('canvas')
    };

    PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;
    PIXI.utils.skipHello ();

    const renderer = new PIXI.Application (rendererOptions);
    renderer.view.style.position = "fixed";

    renderer.ticker.add (() => {onTick (payload);});

    return renderer;
}

//------------------------------------------------------------------------------
function initModules (onTick) {
    const modules = {
        backend: null,
        components: null,
        events: null,
        pixi: null,
        resources: null,
        session: null,
        states: null,
    };

    modules.backend = new FakeBackend ();
    modules.components = new Components (modules);
    modules.events = new Events ();
    modules.pixi = initPixi (onTick, modules);
    modules.resources = new Resources ();
    modules.session = new Session (modules);
    modules.states = new Gamestates (modules);

    return modules;
}

//------------------------------------------------------------------------------
function onTick (payload) {
    payload.states.tick ();
}

//------------------------------------------------------------------------------
window.swan.game = {
    run: function (pageConfig) {
        const modules = initModules (onTick);
        modules.states.changeState ('loading');
    }
}
