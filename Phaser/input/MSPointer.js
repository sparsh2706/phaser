/// <reference path="../_definitions.ts" />
/**
* Phaser - MSPointer
*
* The MSPointer class handles touch interactions with the game and the resulting Pointer objects.
* It will work only in Internet Explorer 10 and Windows Store or Windows Phone 8 apps using JavaScript.
* http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx
*/
var Phaser;
(function (Phaser) {
    var MSPointer = (function () {
        /**
        * Constructor
        * @param {Game} game.
        * @return {MSPointer} This object.
        */
        function MSPointer(game) {
            /**
            * You can disable all Input by setting disabled = true. While set all new input related events will be ignored.
            * @type {Boolean}
            */
            this.disabled = false;
            this.game = game;
        }
        /**
        * Starts the event listeners running
        * @method start
        */
        MSPointer.prototype.start = function () {
            var _this = this;
            if (this.game.device.mspointer == true) {
                this._onMSPointerDown = function (event) {
                    return _this.onPointerDown(event);
                };
                this._onMSPointerMove = function (event) {
                    return _this.onPointerMove(event);
                };
                this._onMSPointerUp = function (event) {
                    return _this.onPointerUp(event);
                };

                this.game.stage.canvas.addEventListener('MSPointerDown', this._onMSPointerDown, false);
                this.game.stage.canvas.addEventListener('MSPointerMove', this._onMSPointerMove, false);
                this.game.stage.canvas.addEventListener('MSPointerUp', this._onMSPointerUp, false);
            }
        };

        /**
        *
        * @method onPointerDown
        * @param {Any} event
        **/
        MSPointer.prototype.onPointerDown = function (event) {
            if (this.game.input.disabled || this.disabled) {
                return;
            }

            event.preventDefault();
            event.identifier = event.pointerId;

            this.game.input.startPointer(event);
        };

        /**
        *
        * @method onPointerMove
        * @param {Any} event
        **/
        MSPointer.prototype.onPointerMove = function (event) {
            if (this.game.input.disabled || this.disabled) {
                return;
            }

            event.preventDefault();
            event.identifier = event.pointerId;

            this.game.input.updatePointer(event);
        };

        /**
        *
        * @method onPointerUp
        * @param {Any} event
        **/
        MSPointer.prototype.onPointerUp = function (event) {
            if (this.game.input.disabled || this.disabled) {
                return;
            }

            event.preventDefault();
            event.identifier = event.pointerId;

            this.game.input.stopPointer(event);
        };

        /**
        * Stop the event listeners
        * @method stop
        */
        MSPointer.prototype.stop = function () {
            if (this.game.device.mspointer == true) {
                this.game.stage.canvas.removeEventListener('MSPointerDown', this._onMSPointerDown);
                this.game.stage.canvas.removeEventListener('MSPointerMove', this._onMSPointerMove);
                this.game.stage.canvas.removeEventListener('MSPointerUp', this._onMSPointerUp);
            }
        };
        return MSPointer;
    })();
    Phaser.MSPointer = MSPointer;
})(Phaser || (Phaser = {}));
