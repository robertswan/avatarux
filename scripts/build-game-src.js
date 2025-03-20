//------------------------------------------------------------------------------
const Browserify = require ("browserify");
const Fs = require ("fs");
const Utils = require ("./utils.js");
const Watchify = require ("watchify");

//------------------------------------------------------------------------------
const keys = {
    "-p":  "project",
    "-t":  "target",
    "-b":  "build",
    "-dp": "deployPath",
    "-f":  "feature",
    "-a":  "audio",
    "-w":  "watchify"
};
const args = Utils.extractArgs2 (process.argv.slice (2), keys);
args.deployPath = args.deployPath || "./deploy/";
console.log (args);

//------------------------------------------------------------------------------
const paths = [
    "game-src"
];

//------------------------------------------------------------------------------
const targets = {
    game: {
        src: "./game-index.js",
        dst: args.deployPath + "/src/game-bundle.js"
    }
};

//------------------------------------------------------------------------------
const builds = {
    debug: {
        browserify: {debug: true, paths: paths, cache: {}, packageCache: {}, verbose: false, delay: 1000},
        babelify:   {presets: ["@babel/preset-env"]},
        envify:     {_: "purge", PROJECT: args.project, BUILD: "DEBUG", FEATURE: args.feature, AUDIO: args.audio}
    },
    release: {
        browserify: {debug: false, paths: paths, cache: {}, packageCache: {}},
        babelify:   {global: true, presets: ["@babel/preset-env"]},
        envify:     {_: "purge", PROJECT: args.project, BUILD: "RELEASE"}
    }
};

//------------------------------------------------------------------------------
const target = targets [args.target];
const build = builds [args.build];
const b = Browserify (target.src, build.browserify);

//------------------------------------------------------------------------------
function bundle (updatedIds) {
    if (updatedIds) {
        console.log ("----------------------------------------");
        updatedIds.forEach (updated => console.log (">>", updated));
    }

    b.transform ("babelify", build.babelify);
    b.transform ("envify", build.envify);
    if (build.uglifyify) {
        b.transform ("uglifyify");
    }

    b.bundle ()
            .on ("error", console.error)
            .pipe (Fs.createWriteStream (target.dst));
}

//------------------------------------------------------------------------------
function time (msg) {
    console.log ("Time (ms):", msg);
}

//------------------------------------------------------------------------------
function main () {
    if (args.watchify) {
        console.log ("watchify started. CTRL+C to stop (windows)");
        b.plugin (Watchify);
        b.on ("update", bundle);
        b.on ("time", time);
        bundle ();
    } else {
        bundle ();
    }
}
main ();
