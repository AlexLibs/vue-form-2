import merge from 'merge'
import watch from './watch';

module.exports = {
  mounted: function() {

    if (this.required) {
      this.Rules.required = true;
    }

    this.Rules = merge(this.Rules, this.rules);

    let inForm = this.inForm();

    if (inForm) {

      let form = this.getForm();

      if (form.opts.sendOnlyDirtyFields) {

        if (!form.vuex) {
          this.$watch('dirty', (isDirty) => {
            if (isDirty) {
              form.fields.push(this);
            } else if (form.opts.removePristineFields) {
             form.fields =  form.fields.filter((field) => field.name!=this.name)
           }
         });

        }

      } else {
        form.vuex?
        this.commit('CHANGE', this.value):
        form.fields.push(this);
      }


      let v = this.getForm().validation;

      if (v.rules && v.rules.hasOwnProperty(this.name)) {
        this.Rules = merge(this.Rules, v.rules[this.name]);
      }

      if (typeof v.messages!='undefined' &&  v.messages.hasOwnProperty(this.name))
        this.messages = v.messages[this.name];

      setTimeout(function() {
        this.validate();
      }.bind(this),0);

      if (form.relatedFields.hasOwnProperty(this.name))
        this.foreignFields = form.relatedFields[this.name].map(function(name) {
          return form.getField(name);
        });


      if (form.triggeredFields.hasOwnProperty(this.name))
       this.triggeredFields = form.triggeredFields[this.name].map(function(name) {
        return form.getField(name);
      });

     this.handleTriggeredFields();

   }

   if (this.value || this.fieldType==='checkbox') {
    this.setValue(this.value, false); // don't set as dirty on init
  }

  this.$watch('curValue', watch);
}
}
