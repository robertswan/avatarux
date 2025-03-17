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
        symbolH: 0,
        dropDuration: 300,
        dropHeight: 500,
        dropSymbolInterval: 50
    }

    //------------------------------------------------------------------------------
    function getSymbolTex (symbolId, isHighlight) {
        const texId = GameConfig.symbols [symbolId.toString ()].resourcePrefix + ((isHighlight) ? 'Flash' : '');
        return modules.resources.getTexture (texId);
    }

    //------------------------------------------------------------------------------
    this.beginSpin = (delay, onComplete) => {

        const lastIdx = p.symbols.length - 1;

        p.symbols.forEach ((symbol, idx) => {
            const tween = new Tween.Tween (symbol)
                    .to ({y: config.dropHeight + config.symbolH * idx, alpha: 0}, config.dropDuration)
                    .easing (Tween.Easing.Cubic.In)
                    .delay (delay + config.dropSymbolInterval * (lastIdx - idx))
                    .start ();

            if (onComplete && idx === 0) {
                tween.onComplete (onComplete);
            }
        });
    }

    //------------------------------------------------------------------------------
    this.endSpin = (columnface, delay, onComplete) => {
        console.assert (columnface.length === p.symbols.length);

        const lastIdx = p.symbols.length - 1;

        p.symbols.forEach ((symbol, idx) => {
            symbol.y = -config.dropHeight + config.symbolH * idx;
            symbol.alpha = 0;
            symbol.texture = getSymbolTex (columnface [idx], false);
            p.symbolIds [idx] = columnface [idx];

            const tween = new Tween.Tween (symbol)
                    .to ({y: config.symbolH * idx, alpha: 1}, config.dropDuration)
                    .easing (Tween.Easing.Cubic.In)
                    .delay (delay + config.dropSymbolInterval * (lastIdx - idx))
                    .start ();

            if (onComplete && idx === 0) {
                tween.onComplete (onComplete);
            }
        });
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
        config.symbolH = refTex.height;

        p.container.x = refTex.width * colIdx;
        parent.addChild (p.container);

        const s = modules.session;
        columnface.forEach ((symbolId, idx) => {
            const symbol = new PIXI.Sprite (getSymbolTex (symbolId, false));
            symbol.y = idx * config.symbolH;
            p.container.addChild (symbol);
            p.symbols.push (symbol);
            p.symbolIds.push (symbolId);
        })
    }
    construct ();
}

//------------------------------------------------------------------------------
module.exports = ReelColumnComponent;
