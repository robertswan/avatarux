//------------------------------------------------------------------------------
const Utils = {

    //------------------------------------------------------------------------------
    extractArgs2: function (input, keys, paths) {
        input = input.slice (0);
        const result = {};

        for (let key in keys) {
            const arg = keys [key];
            if (typeof arg === "string") {
                result [arg] = null;
            } else {
                result [arg [0]] = [];
            }

            let keyIdx = -1;
            while ((keyIdx = input.indexOf (key)) !== -1) {
                if (typeof arg === "string") {
                    if (keyIdx >= input.length - 1 || input [keyIdx + 1][0] === "-") {
                        result [arg] = true;
                    } else if (!isNaN (parseInt (input [keyIdx + 1]))) {
                        result [arg] = parseInt (input [keyIdx + 1]);
                        input.splice (keyIdx, 1);
                    } else {
                        result [arg] = input [keyIdx + 1];
                        input.splice (keyIdx, 1);
                    }
                    input.splice (keyIdx, 1);
                } else {
                    const key2 = arg [0];
                    result [key2].push (input [keyIdx + 1]);
                    input.splice (keyIdx, 1);
                    input.splice (keyIdx, 1);
                }
            }
        }
        if (paths) {
            result [paths] = input;
        }
        return result;
    }
}

//------------------------------------------------------------------------------
module.exports = Utils;