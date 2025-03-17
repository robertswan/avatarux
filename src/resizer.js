//------------------------------------------------------------------------------
function Resizer (modules) {
    const self = this;

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    //------------------------------------------------------------------------------
    function onResize () {
        self.w = window.innerWidth;
        self.h = window.innerHeight;
        // modules.pixi.renderer.resize (self.w, self.h);

        if (modules.components.layout) {
            modules.components.layout.resize (self.w, self.h);
        }
    }

    //------------------------------------------------------------------------------
    function preventTouchMove (event) {
        event.preventDefault ();
    }

    //------------------------------------------------------------------------------
    function construct () {
        window.addEventListener ('resize', onResize);
        window.addEventListener ('deviceOrientation', onResize);
        window.addEventListener ('touchmove', preventTouchMove);
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = Resizer;
