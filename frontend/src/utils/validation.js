export function validationRules (name, value) {
	const rule = {
		author: !!value.trim() && value.length > 6,
		title: !!value.trim() && value.length > 6,
		body: !!value.trim() && value.length > 6,
		category: !!value.trim()
	}

	return rule[name]
}

export function isValid (form) {
	return Object.keys(form).every(function (key) {
		return form[key]
	});
}
