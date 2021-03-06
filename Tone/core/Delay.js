define(["Tone/core/Tone", "Tone/core/Param", "Tone/core/AudioNode"], function (Tone) {

	"use strict";

	/**
	 *  @class Wrapper around Web Audio's native [DelayNode](http://webaudio.github.io/web-audio-api/#the-delaynode-interface).
	 *  @extends {Tone}
	 *  @param {Time=} delayTime The delay applied to the incoming signal.
	 *  @param {Time=} maxDelay The maximum delay time.
	 */
	Tone.Delay = function(){

		var options = Tone.defaults(arguments, ["delayTime", "maxDelay"], Tone.Delay);
		Tone.AudioNode.call(this);

		var maxDelay = Math.max(this.toSeconds(options.maxDelay), this.toSeconds(options.delayTime));
		/**
		 *  The native delay node
		 *  @type {DelayNode}
		 *  @private
		 */
		this._delayNode = this.input = this.output = this.context.createDelay(maxDelay);

		/**
		 *  The amount of time the incoming signal is
		 *  delayed.
		 *  @type {Time}
		 *  @signal
		 */
		this.delayTime = new Tone.Param({
			"param" : this._delayNode.delayTime,
			"units" : Tone.Type.Time,
			"value" : options.delayTime
		});

		this._readOnly("delayTime");
	};

	Tone.extend(Tone.Delay, Tone.AudioNode);

	/**
	 *  The defaults
	 *  @const
	 *  @type  {Object}
	 */
	Tone.Delay.defaults = {
		"maxDelay" : 1,
		"delayTime" : 0
	};

	/**
	 *  Clean up.
	 *  @return  {Tone.Delay}  this
	 */
	Tone.Delay.prototype.dispose = function(){
		Tone.AudioNode.prototype.dispose.call(this);
		this._delayNode.disconnect();
		this._delayNode = null;
		this._writable("delayTime");
		this.delayTime = null;
		return this;
	};

	return Tone.Delay;
});
