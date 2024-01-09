import { AbstractComponent } from "./abstract.component.ts";
import { Component } from "./component.decorator.ts";

@Component({
	selector: 'je-text-field',
	template: `
		<label>
			{{ labelText }}
			<input type="text" placeholder="Enter text here.." class="text-field">
		</label>
	`,
	styling: `
		::host {
			margin: 1em;
		}
	`
})
export class TextFieldComponent extends AbstractComponent {
	private _labelText: string | undefined;
	set labelText(text: string | undefined) {
		this._labelText = text;
	}
	get labelText(): string | undefined {
		return this._labelText;
	}
}
