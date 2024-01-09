import { AbstractComponent } from "./abstract.component.ts";
import { Component } from "./component.decorator.ts";

@Component({
	selector: 'je-number-field',
	template: `
		<label>
			{{ labelText }}
			<input type="number" class="number-input" placeholder="Enter a number here..">
		</label>
		<!-- No connectedCallback in abstract -->
		<je-text-field></je-text-field>
	`,
	styling: `
		::host {
			margin: 1em;
		}
		
		.number-input {
			margin-left: 1em;
		}
	`
})
export class NumberFieldComponent extends AbstractComponent {

}
