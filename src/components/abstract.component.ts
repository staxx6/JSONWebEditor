export enum HTMLDecoratorNames {
	Template = "template",
	Content = "content"
}

export abstract class AbstractComponent extends HTMLElement {

	private static _registeredComponentsStyles: string[] = [];

	private _instanceID = "id" + Math.random().toString(36).substring(2, 10);

	// Get overridden by decorator
	getTemplate(): string {
		return '##no_html_template';
	}

	getSelector(): string {
		return '##no_selector';
	}

	constructor() {
		super();
	}

	getStyling(): string {
		return '##no_styling';
	}

	private createInstancedCSSSelector(selector: string): string {
		return `${selector}[${this._instanceID}]`;
	}

	private getProcessedStyling(): string {
		const styling = this.getStyling();
		let processedStyling = styling.replace(/::(\w+)/g, (match, g1) => {
			switch (g1) {
				case 'main':
					return this.createInstancedCSSSelector('#main');
				case 'host':
					return this.getSelector();
			}
		});
		processedStyling = processedStyling.replace(/\.(\w+)/g, (match, g1) => {
			return this.createInstancedCSSSelector('g1');
		});
		return processedStyling;
	}

	private createStyling(): void {
		if (!AbstractComponent._registeredComponentsStyles.includes(this.getSelector())) {
			const style = document.createElement('style');
			style.textContent = this.getProcessedStyling();
			document.head.appendChild(style);
			AbstractComponent._registeredComponentsStyles.push(this.getSelector());
		}
	}

	render() {
		this.innerHTML = this.getProcessedTemplate();
		this.createStyling();
		this.setAttribute(this._instanceID, '');
	}

	// private get selector(): string {
	// 	// @ts-ignore
	// 	return this.prototype['__selector'] ?? '##no_selector';
	// }

	// Directly using prototype because of static function
	static get SELECTOR(): string {
		// @ts-ignore
		return this.prototype['__selector'] ?? '##no_selector';
	}

	private getProcessedTemplate(): string {
		const template = this.getTemplate();
		// {{ prop }}
		let processedTemplate = template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, g1) => {
			return (this as any)[g1] ?? '## no property found in class';
		});
		// @decorator
		processedTemplate = processedTemplate.replace(/(?!\/)@(\w+)\('(.+)'\)/g, (match, g1, g2) => {
			return this.processDecorator(g1, g2);
		});
		// <ELEMENT>
		processedTemplate = processedTemplate.replace(/<(?!!--)\s*(\w+)\b/g, (match, g1) => {
			return `<${g1} ${this._instanceID}`;
		});
		return processedTemplate;
	}

	private tryConvertParam(param: string): any {
		switch(param) {
			case 'true':
				return true;
			case 'false':
				return false;
			case 'null':
				return null;
			case 'undefined':
				return undefined;
			default:
				const asNumber = Number(param);
				return !isNaN(asNumber) ? asNumber : param;
		}
	}

	private processDecorator(name: string, paramsString: string): string {
		const params = paramsString.split(',').map(param => this.tryConvertParam(param.trim()));
		switch (name) {
			case HTMLDecoratorNames.Template:
				return this.processContentDecorator(params);
			case HTMLDecoratorNames.Content:
				return this.processContentDecorator(params)
		}
		return "## Decorator processing not defined for " + name;
	}

	private processContentDecorator(params: string[]): string {
		return `<div id="${params[0]}"></div>`;
	}

	private processTemplateDecorator(params: string[]): string {
		return '## processTemplateDecorator not implemented';
	}

	addElement(element: AbstractComponent, id = 'main') {
		// const container = this.querySelector(`#${id}_${this._instanceID}`);
		const container = this.querySelector(this.createInstancedCSSSelector(`#${id}`));
		if (container) {
			container.appendChild(element);
		}
	}
}
