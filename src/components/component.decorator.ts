interface ComponentOptions {
	selector: string;
	template: string;
	/**
	 * Currently only global styling
	 */
	styling?: string;
}

// Decorator
export function Component(options: ComponentOptions) {
	return function(constructor: Function) {
		constructor.prototype['__selector'] = options.selector;

		// Overwriting abstract function
		constructor.prototype['getSelector'] = function getSelector(): string {
			return options.selector ?? '';
		};

		// Overwriting abstract function
		constructor.prototype['getTemplate'] = function getTemplate(): string {
			return options.template;
		};

		// Overwriting abstract function
		constructor.prototype['getStyling'] = function getStyling(): string {
			return options.styling ?? '';
		};
	}
}
