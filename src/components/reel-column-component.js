//------------------------------------------------------------------------------
const Tween = require ("@tweenjs/tween.js");

const GameConfig = require ("../game-config.json");

//------------------------------------------------------------------------------
function ReelColumnComponent (modules, colIdx, columnface, parent) {

    //------------------------------------------------------------------------------
    const p = {
        container: new PIXI.Container (),
        symbols: [],
        symbolIds: []
    };

    const config = {
        dropDuration: 200,
        dropHeight: 500
    }

    //------------------------------------------------------------------------------
    function getSymbolTex (symbolId, isHighlight) {
        const texId = GameConfig.symbols [symbolId.toString ()].resourcePrefix + ((isHighlight) ? 'Flash' : '');
        return modules.resources.getTexture (texId);
    }

    //------------------------------------------------------------------------------
    this.beginSpin = (delay, onComplete) => {
        const tween = new Tween.Tween (p.container)
                .to ({y: config.dropHeight, alpha: 0}, config.dropDuration)
                .easing (Tween.Easing.Cubic.In)
                .delay (delay)
                .start ();

        if (onComplete) {
            tween.onComplete (onComplete);
        }
    }

    //------------------------------------------------------------------------------
    this.endSpin = (columnface, delay, onComplete) => {
        console.assert (columnface.length === p.symbols.length);

        p.container.alpha = 0;
        p.container.y = -config.dropHeight;

        p.symbols.forEach ((symbol, idx) => {
            symbol.texture = getSymbolTex (columnface [idx], false);
            p.symbolIds [idx] = columnface [idx];
        });

        const tween = new Tween.Tween (p.container)
                .to ({y: 0, alpha: 1}, config.dropDuration)
                .easing (Tween.Easing.Cubic.In)
                .delay (delay)
                .start ();

        if (onComplete) {
            tween.onComplete (onComplete);
        }
    }

    //------------------------------------------------------------------------------
    this.flashSymbols = (symbolsUsed) => {
        console.assert (symbolsUsed.length === p.symbols.length);

        p.symbols.forEach ((symbol, idx) => {
            if (symbolsUsed [idx]) {
                symbol.texture = getSymbolTex (p.symbolIds [idx], true);
            } else {
                // symbol.alpha = 0.5;
            }
        });
    }

    //------------------------------------------------------------------------------
    this.reset = () => {
        p.symbols.forEach ((symbol, idx) => {
            symbol.texture = getSymbolTex (p.symbolIds [idx], false);
            // symbol.alpha = 1;
        });
    }

    //------------------------------------------------------------------------------
    function construct () {
        const refTex = getSymbolTex (0, false);
        p.container.x = refTex.width * colIdx;
        parent.addChild (p.container);

        const s = modules.session;
        columnface.forEach ((symbolId, idx) => {
            const symbol = new PIXI.Sprite (getSymbolTex (symbolId, false));
            symbol.y = idx * refTex.height;
            p.container.addChild (symbol);
            p.symbols.push (symbol);
            p.symbolIds.push (symbolId);
        })
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = ReelColumnComponent;
