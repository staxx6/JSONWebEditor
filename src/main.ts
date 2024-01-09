import schema from './schemas/test-schema.json';
import { TextFieldComponent } from "./components/text-field.component.ts";
import { FormComponent } from "./components/form.component.ts";
import { NumberFieldComponent } from "./components/number-field.component.ts";

createForm(schema);

// const registeredHTMLComponents = new Map<string, HTMLElement>;

function createForm(schema: any): void {
	const properties = schema.properties;
	// const form = document.createElement('form');
	const form = createHTMLComponent(FormComponent.SELECTOR) as FormComponent;
	for (const prop in properties) {
		switch (properties[prop].type) {
			case 'string':
				const textField = createHTMLComponent(TextFieldComponent.SELECTOR, prop) as TextFieldComponent;
				form.addElement(textField);
				break;
			case 'number':
				const numberField = createHTMLComponent(NumberFieldComponent.SELECTOR, prop) as NumberFieldComponent;
				form.addElement(numberField);
				break;
		}
	}
	document.body.appendChild(form);
}

function createHTMLComponent(componentName: string, labelName?: string): HTMLElement {
	switch (componentName) {
		case FormComponent.SELECTOR:
			if (!customElements.get(FormComponent.SELECTOR)) {
				customElements.define(FormComponent.SELECTOR, FormComponent);
			}
			const formComponent = document.createElement(FormComponent.SELECTOR) as FormComponent;
			formComponent.render();
			return formComponent;
		case TextFieldComponent.SELECTOR:
			if (!customElements.get(TextFieldComponent.SELECTOR)) {
				customElements.define(TextFieldComponent.SELECTOR, TextFieldComponent);
			}
			const textFieldComponent = document.createElement(TextFieldComponent.SELECTOR) as TextFieldComponent;
			textFieldComponent.labelText = labelName;
			textFieldComponent.render();
			return textFieldComponent;
		case NumberFieldComponent.SELECTOR:
			if (!customElements.get(NumberFieldComponent.SELECTOR)) {
				customElements.define(NumberFieldComponent.SELECTOR, NumberFieldComponent);
			}
			const numberFieldComponent = document.createElement(NumberFieldComponent.SELECTOR) as TextFieldComponent;
			numberFieldComponent.labelText = labelName;
			numberFieldComponent.render();
			return numberFieldComponent;
		default:
			throw new Error(`No component with name: ${componentName}`);
	}
}

function destroyForm(): void {
	const form = document.querySelector(FormComponent.SELECTOR);
	if (form) {
		form.remove();
	}
}

export function reloadForm(): void {
	destroyForm();
	createForm(schema);
}

document.getElementById("reloadButton")?.addEventListener("click", function() {
  reloadForm();
})
