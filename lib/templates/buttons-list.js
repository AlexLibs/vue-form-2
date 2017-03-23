export default function(h) {

let toggler = '';
let items = [];

if (this.multiple) {
  toggler = <span  class="pull-right btn btn-link"
                   on-click="toggle()">{this.toggleText}</span>
}

this.items.map((item) => {
  if (this.passesFilter(item))
  items.push(<div class={this.itemClass}>
  <label class='form-check-label'>
    <input
            class='form-check-input'
            disabled={this.disabled}
            name={this.name + this.arraySymbol}
            type={this.type}
            value={item.id}
            on-change={this.updateValue.bind(this, item.id)}
            checked={this.isChecked(item.id)}/>
    <span class='form-check-label-text'>{item.text}</span>
  </label>
</div>)
});

return <div class="VF-Buttons__wrapper">
{toggler}
{items}
</div>

}

