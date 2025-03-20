# Online demos
* [Playable demo](http://spinforger.com/avatarux/spintest/)
* [Code coverage report from unit tests](http://spinforger.com/avatarux/coverage/lcov-report/)

# Installation

The environment and base code was taken from an older project to avoid using any proprietary code.
This means node and npm are older versions, as are some of the npm modules, which now give old version errors, but still work.

## Environment Prerequisites

* bash shell
* node
* npm
```
$ node --version
v21.5.0
$ npm --version
10.2.4
```

## Project Cloning

Inside bash shell #1:
```
git clone https://github.com/robertswan/avatarux.git test
cd test
npm install
```
This will clone the project, and install the required npm modules.

## Project Building, Testing and Code Coverage
Inside bash shell #1:
```
npm run start
```
This starts a simple webserver that consumes the bash window. Use CTRL+C (windows) to stop  the server. 

Inside bash shell #2:
```
npm run game-debug
```
This will build the project. No obfuscation is applied, and debug symbols are automatically included to allow project inspection. The local game should be playable [here](http://localhost:8080/)

### Commits
By default all local git commits are aborted if the lint check and unit tests do not succeed.
* For lint errors `npm run lint-fix` will do automatic fixes, and use `npm run lint > lint.txt` to list fixes required manually. 
* For unit test errors `npm run test` will give verbose unit test output, and also build the code coverage report. This can be viewed locally in 
> coverage\lcov-report\index.html
