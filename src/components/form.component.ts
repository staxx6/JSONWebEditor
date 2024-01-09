import { Component } from "./component.decorator.ts";
import { AbstractComponent } from "./abstract.component.ts";

@Component({
	selector: 'je-form',
	template: `
		<form>
			@content('main')
		</form>
	`,
	styling: `
		::main {
			display: flex;
			flex-direction: column;
		}
	`
})
export class FormComponent extends AbstractComponent {
}
