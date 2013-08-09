/// <reference path="../_definitions.ts" />
/**
* Phaser - RequestAnimationFrame
*
* Abstracts away the use of RAF or setTimeOut for the core game update loop. The callback can be re-mapped on the fly.
*/
var Phaser;
(function (Phaser) {
    var RequestAnimationFrame = (function () {
        /**
        * Constructor
        * @param {Any} callback
        * @return {RequestAnimationFrame} This object.
        */
        function RequestAnimationFrame(game, callback) {
            /**
            *
            * @property _isSetTimeOut
            * @type Boolean
            * @private
            **/
            this._isSetTimeOut = false;
            /**
            *
            * @property isRunning
            * @type Boolean
            **/
            this.isRunning = false;
            this.game = game;
            this.callback = callback;

            var vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
            }

            this.start();
        }
        /**
        *
        * @method usingSetTimeOut
        * @return Boolean
        **/
        RequestAnimationFrame.prototype.isUsingSetTimeOut = function () {
            return this._isSetTimeOut;
        };

        /**
        *
        * @method usingRAF
        * @return Boolean
        **/
        RequestAnimationFrame.prototype.isUsingRAF = function () {
            return this._isSetTimeOut === true;
        };

        /**
        * Starts the requestAnimatioFrame running or setTimeout if unavailable in browser
        * @method start
        * @param {Any} [callback]
        **/
        RequestAnimationFrame.prototype.start = function (callback) {
            if (typeof callback === "undefined") { callback = null; }
            var _this = this;
            if (callback) {
                this.callback = callback;
            }

            if (!window.requestAnimationFrame) {
                this._isSetTimeOut = true;
                this._onLoop = function () {
                    return _this.SetTimeoutUpdate();
                };
                this._timeOutID = window.setTimeout(this._onLoop, 0);
            } else {
                this._isSetTimeOut = false;
                this._onLoop = function () {
                    return _this.RAFUpdate(0);
                };
                window.requestAnimationFrame(this._onLoop);
            }

            this.isRunning = true;
        };

        /**
        * Stops the requestAnimationFrame from running
        * @method stop
        **/
        RequestAnimationFrame.prototype.stop = function () {
            if (this._isSetTimeOut) {
                clearTimeout(this._timeOutID);
            } else {
                window.cancelAnimationFrame;
            }

            this.isRunning = false;
        };

        /**
        * The update method for the requestAnimationFrame
        * @method RAFUpdate
        **/
        RequestAnimationFrame.prototype.RAFUpdate = function (time) {
            var _this = this;
            this.game.time.update(time);

            if (this.callback) {
                this.callback.call(this.game);
            }

            this._onLoop = function (time) {
                return _this.RAFUpdate(time);
            };

            window.requestAnimationFrame(this._onLoop);
        };

        /**
        * The update method for the setTimeout
        * @method SetTimeoutUpdate
        **/
        RequestAnimationFrame.prototype.SetTimeoutUpdate = function () {
            var _this = this;
            this.game.time.update(Date.now());

            this._onLoop = function () {
                return _this.SetTimeoutUpdate();
            };

            this._timeOutID = window.setTimeout(this._onLoop, 16);

            if (this.callback) {
                this.callback.call(this.game);
            }
        };
        return RequestAnimationFrame;
    })();
    Phaser.RequestAnimationFrame = RequestAnimationFrame;
})(Phaser || (Phaser = {}));
