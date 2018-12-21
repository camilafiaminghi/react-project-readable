export function validationRules (name, value) {
	const rule = {
		author: !!value.trim() && value.length > 9,
		title: !!value.trim() && value.length > 9,
		body: !!value.trim() && value.length > 9,
		category: !!value.trim()
	}

	return rule[name]
}

export function isValid (form) {
	return Object.keys(form).every(function (key) {
		return form[key]
	});
}
