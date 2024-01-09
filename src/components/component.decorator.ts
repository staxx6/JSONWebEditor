interface ComponentOptions {
	selector: string;
	template: string;
	styling?: string;
}

// Decorator
export function Component(options: ComponentOptions) {
	return function(constructor: Function) {
		constructor.prototype['__selector'] = options.selector;
		constructor.prototype['__componentID'] = "id" + Math.random().toString(36).substring(2, 10);

		// Overwriting abstractComponent function
		constructor.prototype['getComponentID'] = () => {
			return constructor.prototype['__componentID'];
		};

		// Overwriting abstractComponent function
		constructor.prototype['getSelector'] = () => {
			return options.selector ?? '';
		};

		// Overwriting abstractComponent function
		constructor.prototype['getTemplate'] = () => {
			return options.template;
		};

		// Overwriting abstractComponent function
		constructor.prototype['getStyling'] = () =>  {
			return options.styling ?? '';
		};

		// Overwriting abstractComponent function
		constructor.prototype['getStyling'] = () => {
			return options.styling ?? '';
		};

	}
}
