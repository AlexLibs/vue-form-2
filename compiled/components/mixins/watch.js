'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (newVal, oldVal) {

     if (oldVal === newVal) return;

     var form = this.getForm();

     form.dispatch('change::' + this.name, { name: this.name, value: newVal, oldValue: oldVal });
     form.dispatch('change', { name: this.name, value: newVal, oldValue: oldVal });

     if (_typeof(this.foreignFields)) {
          this.foreignFields.forEach(function (field) {
               if (field) field.validate();
          });
     }

     this.handleTriggeredFields();

     this.dirty = this.wasReset ? false : !(0, _isEqual2.default)(this.curValue, this.initialValue);

     this.pristine = this.wasReset;

     this.wasReset = false;

     if (this.inForm()) this.validate();
};

var _isEqual = require('../../helpers/is-equal');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }