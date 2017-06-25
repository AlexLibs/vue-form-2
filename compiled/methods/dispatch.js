'use strict';

var _bus = require('../bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (event, payload) {
	var pieces = event.split("::");
	var eventName = pieces[0];

	if (this.vuex && pieces.length === 1) {
		var EventName = eventName.toUpperCase().replace('-', '_');
		this.$store.commit(this.name + '/' + EventName, payload);
	}

	pieces[0] = this.name ? this.name + '.' + eventName : eventName;
	event = "vue-form." + pieces.join('::');

	_bus2.default.$emit(event, payload);
};